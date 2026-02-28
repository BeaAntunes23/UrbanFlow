from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Dict, List

import numpy as np
import pandas as pd

METRICS = [
    "avg_wait_time",
    "flow_rate",
    "co2_emissions",
    "emergency_response_time",
]

LOWER_IS_BETTER = {"avg_wait_time", "co2_emissions", "emergency_response_time"}


def ci95_normal(series: pd.Series) -> tuple[float, float]:
    values = series.dropna().to_numpy(dtype=float)
    if len(values) == 0:
        return (float("nan"), float("nan"))
    mean = float(np.mean(values))
    if len(values) == 1:
        return (mean, mean)
    std = float(np.std(values, ddof=1))
    half = 1.96 * (std / np.sqrt(len(values)))
    return (mean - half, mean + half)


def permutation_pvalue(a: np.ndarray, b: np.ndarray, n_perm: int = 4000) -> float:
    rng = np.random.default_rng(20260228)
    observed = float(np.mean(a) - np.mean(b))
    combined = np.concatenate([a, b])
    count = 0
    for _ in range(n_perm):
        rng.shuffle(combined)
        perm_a = combined[: len(a)]
        perm_b = combined[len(a) :]
        diff = float(np.mean(perm_a) - np.mean(perm_b))
        if abs(diff) >= abs(observed):
            count += 1
    return (count + 1) / (n_perm + 1)


def bootstrap_ci_difference(
    a: np.ndarray, b: np.ndarray, n_boot: int = 3000
) -> tuple[float, float]:
    rng = np.random.default_rng(20260228)
    diffs: List[float] = []

    for _ in range(n_boot):
        sample_a = rng.choice(a, size=len(a), replace=True)
        sample_b = rng.choice(b, size=len(b), replace=True)
        diffs.append(float(np.mean(sample_a) - np.mean(sample_b)))

    lo, hi = np.percentile(diffs, [2.5, 97.5])
    return (float(lo), float(hi))


def summarize(df: pd.DataFrame) -> pd.DataFrame:
    rows = []
    grouped = df.groupby(["scenario", "mode"], sort=True)

    for (scenario, mode), group in grouped:
        row: Dict[str, object] = {
            "scenario": scenario,
            "mode": mode,
            "n": len(group),
        }
        for metric in METRICS:
            values = group[metric].astype(float)
            ci_lo, ci_hi = ci95_normal(values)
            row[f"{metric}_mean"] = float(values.mean())
            row[f"{metric}_std"] = float(values.std(ddof=1)) if len(values) > 1 else 0.0
            row[f"{metric}_ci95_lo"] = ci_lo
            row[f"{metric}_ci95_hi"] = ci_hi
        rows.append(row)

    return pd.DataFrame(rows)


def compare_modes(df: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for scenario in sorted(df["scenario"].unique()):
        subset = df[df["scenario"] == scenario]
        ai = subset[subset["mode"] == "ai"]
        trad = subset[subset["mode"] == "traditional"]

        if ai.empty or trad.empty:
            continue

        for metric in METRICS:
            ai_vals = ai[metric].astype(float).to_numpy()
            trad_vals = trad[metric].astype(float).to_numpy()

            diff = float(np.mean(ai_vals) - np.mean(trad_vals))
            pvalue = permutation_pvalue(ai_vals, trad_vals)
            ci_lo, ci_hi = bootstrap_ci_difference(ai_vals, trad_vals)

            if metric in LOWER_IS_BETTER:
                improvement_pct = float((np.mean(trad_vals) - np.mean(ai_vals)) / np.mean(trad_vals) * 100)
            else:
                improvement_pct = float((np.mean(ai_vals) - np.mean(trad_vals)) / np.mean(trad_vals) * 100)

            rows.append(
                {
                    "scenario": scenario,
                    "metric": metric,
                    "ai_mean": float(np.mean(ai_vals)),
                    "traditional_mean": float(np.mean(trad_vals)),
                    "difference_ai_minus_traditional": diff,
                    "difference_ci95_lo": ci_lo,
                    "difference_ci95_hi": ci_hi,
                    "improvement_percent": improvement_pct,
                    "pvalue_permutation": pvalue,
                }
            )

    return pd.DataFrame(rows)


def to_markdown(summary_df: pd.DataFrame, comparison_df: pd.DataFrame, source_csv: Path) -> str:
    lines = []
    lines.append("# Relatório Estatístico de Campanha Experimental")
    lines.append("")
    lines.append(f"Fonte de dados: `{source_csv}`")
    lines.append("")
    lines.append("## Resumo por Cenário e Modo")
    lines.append("")

    for scenario in sorted(summary_df["scenario"].unique()):
        lines.append(f"### Cenário: {scenario}")
        scenario_rows = summary_df[summary_df["scenario"] == scenario]
        for _, row in scenario_rows.iterrows():
            lines.append(f"- Modo: **{row['mode']}** (n={int(row['n'])})")
            for metric in METRICS:
                lines.append(
                    f"  - {metric}: mean={row[f'{metric}_mean']:.3f}, "
                    f"CI95=[{row[f'{metric}_ci95_lo']:.3f}, {row[f'{metric}_ci95_hi']:.3f}]"
                )
        lines.append("")

    lines.append("## Comparação IA vs Tradicional")
    lines.append("")
    for scenario in sorted(comparison_df["scenario"].unique()):
        lines.append(f"### Cenário: {scenario}")
        scenario_rows = comparison_df[comparison_df["scenario"] == scenario]
        for _, row in scenario_rows.iterrows():
            lines.append(
                f"- {row['metric']}: IA={row['ai_mean']:.3f}, Trad={row['traditional_mean']:.3f}, "
                f"Δ={row['difference_ai_minus_traditional']:.3f}, "
                f"CI95(Δ)=[{row['difference_ci95_lo']:.3f}, {row['difference_ci95_hi']:.3f}], "
                f"melhoria={row['improvement_percent']:.2f}%, p={row['pvalue_permutation']:.4f}"
            )
        lines.append("")

    lines.append("## Nota Metodológica")
    lines.append("- Intervalos de confiança de cada modo: aproximação normal (95%).")
    lines.append("- Intervalo para diferença IA-Tradicional: bootstrap (95%).")
    lines.append("- Significância: teste de permutação bilateral.")

    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Analisar campanha experimental UrbanFlow")
    parser.add_argument(
        "--input",
        type=str,
        default=str(
            Path(__file__).resolve().parents[2]
            / "Frontend"
            / "experiments"
            / "results"
            / "latest.csv"
        ),
        help="Ficheiro CSV da campanha experimental",
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default=str(Path(__file__).resolve().parent / "results"),
        help="Diretório de saída para tabelas e relatório",
    )
    args = parser.parse_args()

    source_csv = Path(args.input).resolve()
    output_dir = Path(args.output_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    df = pd.read_csv(source_csv)

    required_columns = {"scenario", "mode", *METRICS}
    missing = required_columns - set(df.columns)
    if missing:
        raise ValueError(f"CSV inválido. Colunas em falta: {sorted(missing)}")

    summary_df = summarize(df)
    comparison_df = compare_modes(df)

    summary_csv = output_dir / "summary_by_mode.csv"
    comparison_csv = output_dir / "comparison_ai_vs_traditional.csv"
    report_md = output_dir / "analise_experimental.md"
    report_json = output_dir / "analise_experimental.json"

    summary_df.to_csv(summary_csv, index=False)
    comparison_df.to_csv(comparison_csv, index=False)

    report_md.write_text(to_markdown(summary_df, comparison_df, source_csv), encoding="utf-8")

    report_payload = {
        "source_csv": str(source_csv),
        "summary_rows": summary_df.to_dict(orient="records"),
        "comparison_rows": comparison_df.to_dict(orient="records"),
    }
    report_json.write_text(json.dumps(report_payload, indent=2), encoding="utf-8")

    print(f"[analysis] summary: {summary_csv}")
    print(f"[analysis] comparison: {comparison_csv}")
    print(f"[analysis] report: {report_md}")


if __name__ == "__main__":
    main()
