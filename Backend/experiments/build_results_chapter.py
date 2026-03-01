from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd

METRIC_NAMES = {
    "avg_wait_time": "tempo médio de espera",
    "flow_rate": "taxa de fluxo",
    "co2_emissions": "emissões de CO2",
    "emergency_response_time": "tempo de resposta de emergência",
    "total_collisions": "colisões totais",
    "collision_avoided": "colisões evitadas",
    "light_avg_wait_time": "tempo médio de espera (ligeiros)",
    "heavy_avg_wait_time": "tempo médio de espera (pesados)",
    "light_completed": "veículos ligeiros concluídos",
    "heavy_completed": "veículos pesados concluídos",
}

LOWER_IS_BETTER = {
    "avg_wait_time",
    "co2_emissions",
    "emergency_response_time",
    "total_collisions",
    "light_avg_wait_time",
    "heavy_avg_wait_time",
}


def interpretation(metric: str, improvement: float) -> str:
    if metric in LOWER_IS_BETTER:
        direction = "redução" if improvement >= 0 else "aumento"
    else:
        direction = "aumento" if improvement >= 0 else "redução"

    return f"{direction} de {abs(improvement):.2f}%"


def build_chapter(comparison_df: pd.DataFrame, source_csv: Path) -> str:
    lines = []

    lines.append("# Capítulo de Resultados Experimentais")
    lines.append("")
    lines.append("## Metodologia Experimental")
    lines.append("")
    lines.append("Foi realizada uma campanha comparativa entre os modos de controlo **IA** e **Tradicional**,")
    lines.append("utilizando o mesmo ambiente de simulação, múltiplos cenários urbanos e repetições independentes.")
    lines.append("")
    lines.append(f"Fonte de dados da campanha: `{source_csv}`")
    lines.append("")
    lines.append("A análise considerou as métricas:")
    lines.append("- tempo médio de espera;")
    lines.append("- taxa de fluxo;")
    lines.append("- emissões de CO2;")
    lines.append("- tempo de resposta de emergência.")
    lines.append("- colisões totais;")
    lines.append("- colisões evitadas.")
    lines.append("- tempo médio de espera por classe (ligeiros e pesados);")
    lines.append("- volume concluído por classe (ligeiros e pesados).")
    lines.append("")
    lines.append("Para a inferência estatística foram usados:")
    lines.append("- intervalos de confiança (95%);")
    lines.append("- teste de permutação bilateral para diferença IA vs Tradicional.")
    lines.append("")
    lines.append("## Resultados por Cenário")
    lines.append("")

    for scenario in sorted(comparison_df["scenario"].unique()):
        lines.append(f"### {scenario}")
        scenario_df = comparison_df[comparison_df["scenario"] == scenario]

        for _, row in scenario_df.iterrows():
            metric = row["metric"]
            metric_name = METRIC_NAMES.get(metric, metric)
            improvement = float(row["improvement_percent"])
            pvalue = float(row["pvalue_permutation"])
            ai_mean = float(row["ai_mean"])
            trad_mean = float(row["traditional_mean"])
            diff = float(row["difference_ai_minus_traditional"])
            ci_lo = float(row["difference_ci95_lo"])
            ci_hi = float(row["difference_ci95_hi"])
            analysis_type = row.get("analysis_type", "unpaired")
            n_pairs = int(row.get("n_pairs", 0))
            n_ai = int(row.get("n_ai", 0))
            n_traditional = int(row.get("n_traditional", 0))

            if analysis_type == "paired":
                method_text = f"análise emparelhada (n pares={n_pairs})"
            else:
                method_text = f"análise não emparelhada (n IA={n_ai}, n Tradicional={n_traditional})"

            lines.append(
                f"- Na métrica **{metric_name}**, o modo IA apresentou média {ai_mean:.3f} "
                f"(Tradicional: {trad_mean:.3f}), com diferença IA-Tradicional de {diff:.3f} "
                f"(CI95: [{ci_lo:.3f}, {ci_hi:.3f}]), correspondendo a {interpretation(metric, improvement)}; "
                f"p={pvalue:.4f} ({method_text})."
            )

        lines.append("")

    lines.append("## Síntese")
    lines.append("")
    lines.append("De forma global, os resultados permitem quantificar ganhos e limitações do controlo IA")
    lines.append("em diferentes cenários. A interpretação final deve considerar simultaneamente magnitude")
    lines.append("do efeito, consistência entre cenários e significância estatística.")
    lines.append("")
    lines.append("## Figuras recomendadas")
    lines.append("")
    lines.append("- Boxplots por cenário e métrica (distribuição das corridas).")
    lines.append("- Barras com média e CI95 para IA vs Tradicional por cenário.")

    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Gerar capítulo académico de resultados")
    parser.add_argument(
        "--comparison",
        type=str,
        default=str(Path(__file__).resolve().parent / "results" / "comparison_ai_vs_traditional.csv"),
        help="CSV de comparação IA vs Tradicional",
    )
    parser.add_argument(
        "--source-csv",
        type=str,
        default=str(
            Path(__file__).resolve().parents[2]
            / "Frontend"
            / "experiments"
            / "results"
            / "latest.csv"
        ),
        help="CSV bruto da campanha",
    )
    parser.add_argument(
        "--output",
        type=str,
        default=str(Path(__file__).resolve().parent / "results" / "capitulo_resultados.md"),
        help="Ficheiro markdown de saída",
    )
    args = parser.parse_args()

    comparison_path = Path(args.comparison).resolve()
    source_csv = Path(args.source_csv).resolve()
    output = Path(args.output).resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    comparison_df = pd.read_csv(comparison_path)

    chapter_md = build_chapter(comparison_df, source_csv)
    output.write_text(chapter_md, encoding="utf-8")

    print(f"[chapter] {output}")


if __name__ == "__main__":
    main()
