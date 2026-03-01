from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


def run_step(command: list[str], label: str) -> None:
    print(f"[pipeline] {label}: {' '.join(command)}")
    subprocess.run(command, check=True)


def sync_figures(source_dir: Path, target_dir: Path) -> int:
    target_dir.mkdir(parents=True, exist_ok=True)
    copied = 0

    for source_file in sorted(source_dir.glob("*.png")):
        shutil.copy2(source_file, target_dir / source_file.name)
        copied += 1

    return copied


def main() -> None:
    parser = argparse.ArgumentParser(description="Executar pipeline completo de análise experimental")
    parser.add_argument(
        "--input-csv",
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
        "--output-dir",
        type=str,
        default=str(Path(__file__).resolve().parent / "results"),
        help="Diretório base de resultados no backend",
    )
    parser.add_argument(
        "--sync-frontend-figures",
        action="store_true",
        help="Copiar PNGs para Frontend/public/figuras no final",
    )
    args = parser.parse_args()

    script_dir = Path(__file__).resolve().parent
    output_dir = Path(args.output_dir).resolve()
    input_csv = Path(args.input_csv).resolve()

    summary_csv = output_dir / "summary_by_mode.csv"
    comparison_csv = output_dir / "comparison_ai_vs_traditional.csv"
    figures_dir = output_dir / "figuras"
    chapter_md = output_dir / "capitulo_resultados.md"

    run_step(
        [
            sys.executable,
            str(script_dir / "analyze_campaign.py"),
            "--input",
            str(input_csv),
            "--output-dir",
            str(output_dir),
        ],
        "Análise estatística",
    )

    run_step(
        [
            sys.executable,
            str(script_dir / "generate_plots.py"),
            "--raw",
            str(input_csv),
            "--summary",
            str(summary_csv),
            "--output-dir",
            str(figures_dir),
        ],
        "Geração de gráficos",
    )

    run_step(
        [
            sys.executable,
            str(script_dir / "build_results_chapter.py"),
            "--comparison",
            str(comparison_csv),
            "--source-csv",
            str(input_csv),
            "--output",
            str(chapter_md),
        ],
        "Geração de capítulo",
    )

    if args.sync_frontend_figures:
        frontend_figures = Path(__file__).resolve().parents[2] / "Frontend" / "public" / "figuras"
        copied = sync_figures(figures_dir, frontend_figures)
        print(f"[pipeline] Figuras copiadas para frontend: {copied}")

    print("[pipeline] Concluído com sucesso")


if __name__ == "__main__":
    main()
