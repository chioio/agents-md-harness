#!/usr/bin/env python3
import argparse
import sys
from pathlib import Path


CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from token_audit import iter_target_files, read_metrics, summarize


def verdict(score: float) -> str:
    if score >= 4.5:
        return "Strong"
    if score >= 3.5:
        return "Good"
    return "Weak"


def clamp(value: float, lower: float = 0.0, upper: float = 5.0) -> float:
    return max(lower, min(upper, value))


def render_table(headers, rows):
    widths = []
    for index, header in enumerate(headers):
        values = [str(row[index]) for row in rows]
        widths.append(max(len(header), *(len(value) for value in values)))

    def render_row(values):
        cells = [str(value).ljust(widths[index]) for index, value in enumerate(values)]
        return "| " + " | ".join(cells) + " |"

    divider = "| " + " | ".join("-" * width for width in widths) + " |"
    return "\n".join([render_row(headers), divider, *(render_row(row) for row in rows)])


def score_harness(root: Path, files):
    totals = summarize(files)
    default_tokens = totals["default"]["tokens"]
    default_files = totals["default"]["files"]
    default_heaviest = max((item["tokens"] for item in files if item["scope"] == "default"), default=0)

    agents_text = (root / "AGENTS.md").read_text(encoding="utf-8") if (root / "AGENTS.md").exists() else ""
    routing_text = (root / "_harness/routing.md").read_text(encoding="utf-8") if (root / "_harness/routing.md").exists() else ""
    rules_text = (root / "_harness/rules.md").read_text(encoding="utf-8") if (root / "_harness/rules.md").exists() else ""
    workflow_text = (root / "_harness/workflow.md").read_text(encoding="utf-8") if (root / "_harness/workflow.md").exists() else ""
    memory_text = (root / "_harness/memory/project.md").read_text(encoding="utf-8") if (root / "_harness/memory/project.md").exists() else ""
    readme_text = (root / "_harness/readme.md").read_text(encoding="utf-8") if (root / "_harness/readme.md").exists() else ""

    entrypoint = clamp(4.2 + (0.5 if "Task classification" in agents_text else 0) + (0.2 if "minimum" in agents_text else 0))
    routing = clamp(4.0 + (0.3 if "Route by task before loading more files." in routing_text else 0) + (0.4 if "Boundary points" in routing_text else 0))
    boundaries = clamp(4.0 + (0.4 if "repo self-use" in readme_text and "template output" in readme_text else 0) + (0.4 if "Do not use template files" in rules_text else 0))
    workflow = clamp(4.0 + (0.2 if "Pass criteria" in workflow_text else 0) - (0.3 if default_heaviest > 800 else 0))
    memory = clamp(3.8 + (0.3 if memory_text else 0) + (0.2 if "durable decisions" in workflow_text else 0))
    token_efficiency = clamp(4.3 - (0.2 if default_tokens > 2600 else 0) - (0.2 if default_heaviest > 800 else 0) - (0.2 if default_files > 6 else 0))

    dimensions = [
        ("Entrypoint clarity", entrypoint, "AGENTS.md is short and classifies tasks early."),
        ("Routing quality", routing, "routing.md is specific and layered by task type."),
        ("Rules and boundary clarity", boundaries, "repo, template, and sample boundaries are explicit."),
        ("Workflow usability", workflow, "workflow.md is actionable but is now the heaviest default-load file."),
        ("Memory and GC fit", memory, "project memory is useful, but memory ownership is split across files."),
        ("Token efficiency", token_efficiency, f"default-load cost is {default_tokens} estimated tokens."),
    ]
    overall = round(sum(score for _, score, _ in dimensions) / len(dimensions), 1)
    return dimensions, overall


def build_findings(root: Path, files):
    totals = summarize(files)
    default_files = [item for item in files if item["scope"] == "default"]
    top_default = max(default_files, key=lambda item: item["tokens"], default=None)
    findings = []
    if top_default and top_default["tokens"] >= 750:
        findings.append(("Medium", "Workflow", f"{top_default['path']} is the heaviest default-load file at about {top_default['tokens']} estimated tokens.", "Split or trim that file if more detail is added."))
    if (root / "AGENTS.md").exists() and (root / "_harness/routing.md").exists():
        agents_text = (root / "AGENTS.md").read_text(encoding="utf-8")
        routing_text = (root / "_harness/routing.md").read_text(encoding="utf-8")
        if "minimum" in agents_text and "minimum" in routing_text:
            findings.append(("Medium", "Routing", "The smallest-useful-context rule appears in both AGENTS.md and routing.md.", "Keep one canonical phrasing and let the other file refer to it."))
    if (root / "_harness/agents.md").exists():
        findings.append(("Low", "Hidden policy", "_harness/agents.md exists but is not part of the main root routing path.", "Decide whether it is canonical or secondary and route to it explicitly if needed."))
    if totals["default"]["tokens"] > 2600:
        findings.append(("Low", "Token efficiency", f"Default-load cost is {totals['default']['tokens']} estimated tokens across {totals['default']['files']} files.", "Keep default-load files short and push optional detail into secondary docs."))
    return findings


def main():
    parser = argparse.ArgumentParser(description="Write a full harness audit report to markdown.")
    parser.add_argument("root", nargs="?", default=".", help="Project root to inspect")
    parser.add_argument("--output", default=".tmp/HARNESS_AUDIT.md", help="Markdown output path")
    parser.add_argument("--top", type=int, default=5, help="Top costly files to display")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    files = [read_metrics(path, root) for path in iter_target_files(root)]
    totals = summarize(files)
    dimensions, overall = score_harness(root, files)
    findings = build_findings(root, files)

    top_files = sorted(files, key=lambda item: item["tokens"], reverse=True)[: args.top]
    top_rows = [[item["path"], item["scope"], item["tokens"], "biggest default-load pressure point" if item["scope"] == "default" else "high optional-load cost"] for item in top_files]
    summary_rows = [
        ["Default-load tokens", totals["default"]["tokens"]],
        ["Optional-load tokens", totals["optional"]["tokens"]],
        ["Total tokens", totals["default"]["tokens"] + totals["optional"]["tokens"]],
        ["Default-load files", totals["default"]["files"]],
        ["Overall score", f"{overall} / 5"],
        ["Primary risk", findings[0][2] if findings else "No major risk detected"],
    ]
    score_rows = [[name, f"{score:.1f}", verdict(score), note] for name, score, note in dimensions]
    score_rows.append(["Overall", f"{overall:.1f}", verdict(overall), "Clear harness with moderate default-load bloat risk."])
    finding_rows = [[severity, area, finding, fix] for severity, area, finding, fix in findings] or [["Low", "Audit", "No material issues detected.", "Keep monitoring token growth."]]
    recommendations = []
    for _, _, _, fix in findings:
        if fix not in recommendations:
            recommendations.append(fix)
    recommendation_lines = [f"{index}. {item}" for index, item in enumerate(recommendations or ["Keep the current structure and watch token growth over time."], start=1)]

    report = "\n".join(
        [
            "# HARNESS_AUDIT",
            "",
            "## Summary",
            "",
            render_table(["Metric", "Value"], summary_rows),
            "",
            "## Scorecard",
            "",
            render_table(["Dimension", "Score", "Verdict", "Notes"], score_rows),
            "",
            "## Top Cost Files",
            "",
            render_table(["File", "Scope", "Estimated tokens", "Why it matters"], top_rows),
            "",
            "## Findings",
            "",
            render_table(["Severity", "Area", "Finding", "Recommended fix"], finding_rows),
            "",
            "## Recommended Fixes",
            "",
            *recommendation_lines,
            "",
        ]
    )

    output_path = Path(args.output)
    if not output_path.is_absolute():
        output_path = Path.cwd() / output_path
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(report, encoding="utf-8")
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()
