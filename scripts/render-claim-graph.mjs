#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const inputArgument = process.argv[2];
const outputArgument = process.argv[3];

if (!inputArgument) {
	console.error("Usage: node scripts/render-claim-graph.mjs <02-graph.md> [output-directory]");
	process.exit(1);
}

const inputPath = path.resolve(inputArgument);
const inputBase = path.basename(inputPath, path.extname(inputPath));
const outputDirectory = outputArgument
	? path.resolve(outputArgument)
	: path.resolve(".amp/in/artifacts", inputBase);
fs.mkdirSync(outputDirectory, { recursive: true });
const layersPath = path.join(outputDirectory, `${inputBase}-layers.md`);
const dotPath = path.join(outputDirectory, `${inputBase}.dot`);
const svgPath = path.join(outputDirectory, `${inputBase}.svg`);
const source = fs.readFileSync(inputPath, "utf8");
const sectionBoundary = "\n## Edges\n";

if (!source.includes(sectionBoundary)) {
	throw new Error(`${inputArgument} does not contain an Edges section`);
}

const [claimsAndRetirementsSection, edgesSection] = source.split(sectionBoundary, 2);
const claimsSection = claimsAndRetirementsSection.split("\n## Retired compound claims\n", 1)[0];
const claims = new Map();
const edges = [];
const edgePairs = new Set();

for (const line of claimsSection.split("\n")) {
	const match = line.match(/^\|\s*`(I\d+)`\s*\|\s*(.*?)\s*\|$/);
	if (!match) continue;

	const [, id, claim] = match;
	if (claims.has(id)) throw new Error(`Duplicate claim ID: ${id}`);
	claims.set(id, claim);
}

for (const line of edgesSection.split("\n")) {
	const match = line.match(/^\|\s*`(I\d+)`\s*\|\s*`(I\d+)`\s*\|\s*(.*?)\s*\|$/);
	if (!match) continue;

	const [, from, to, reason] = match;
	const pair = `${from}->${to}`;
	if (edgePairs.has(pair)) throw new Error(`Duplicate dependency: ${pair}`);
	if (from === to) throw new Error(`Self-dependency: ${pair}`);
	if (!claims.has(from)) throw new Error(`Unknown prerequisite: ${from}`);
	if (!claims.has(to)) throw new Error(`Unknown dependent: ${to}`);

	edgePairs.add(pair);
	edges.push({ from, to, reason });
}

if (claims.size === 0) throw new Error(`No claims found in ${inputArgument}`);

const compareIds = (left, right) => Number(left.slice(1)) - Number(right.slice(1));
const ids = [...claims.keys()].sort(compareIds);
const incoming = new Map(ids.map((id) => [id, new Set()]));
const outgoing = new Map(ids.map((id) => [id, new Set()]));

for (const { from, to } of edges) {
	outgoing.get(from).add(to);
	incoming.get(to).add(from);
}

const indegree = new Map(ids.map((id) => [id, incoming.get(id).size]));
const available = ids.filter((id) => indegree.get(id) === 0);
const topologicalOrder = [];

while (available.length > 0) {
	const id = available.shift();
	topologicalOrder.push(id);

	for (const dependent of [...outgoing.get(id)].sort(compareIds)) {
		indegree.set(dependent, indegree.get(dependent) - 1);
		if (indegree.get(dependent) === 0) {
			available.push(dependent);
			available.sort(compareIds);
		}
	}
}

if (topologicalOrder.length !== claims.size) {
	const cycleNodes = ids.filter((id) => !topologicalOrder.includes(id));
	throw new Error(`The graph contains a cycle involving: ${cycleNodes.join(", ")}`);
}

const level = new Map();
for (const id of topologicalOrder) {
	const prerequisites = [...incoming.get(id)];
	level.set(
		id,
		prerequisites.length === 0
			? 0
			: Math.max(...prerequisites.map((prerequisite) => level.get(prerequisite))) + 1,
	);
}

const components = [];
const visited = new Set();

for (const start of ids) {
	if (visited.has(start)) continue;

	const component = [];
	const pending = [start];
	visited.add(start);

	while (pending.length > 0) {
		const id = pending.pop();
		component.push(id);
		const neighbors = new Set([...incoming.get(id), ...outgoing.get(id)]);

		for (const neighbor of [...neighbors].sort(compareIds)) {
			if (visited.has(neighbor)) continue;
			visited.add(neighbor);
			pending.push(neighbor);
		}
	}

	component.sort(compareIds);
	components.push(component);
}

components.sort((left, right) => right.length - left.length || compareIds(left[0], right[0]));

function hasAlternatePath(from, to) {
	const pending = [...outgoing.get(from)].filter((candidate) => candidate !== to);
	const seen = new Set([from]);

	while (pending.length > 0) {
		const id = pending.pop();
		if (id === to) return true;
		if (seen.has(id)) continue;
		seen.add(id);
		pending.push(...[...outgoing.get(id)].filter((candidate) => !seen.has(candidate)));
	}

	return false;
}

const reducedEdges = edges.filter(({ from, to }) => !hasAlternatePath(from, to));
const maxLevel = Math.max(...level.values());
const markdownPath = path.basename(layersPath);
const svgFilename = path.basename(svgPath);
const dotFilename = path.basename(dotPath);

function markdownIds(values, emptyLabel) {
	const sorted = [...values].sort(compareIds);
	return sorted.length > 0 ? sorted.map((id) => `\`${id}\``).join(", ") : emptyLabel;
}

const layers = [
	"# Claim graph dependency layers",
	"",
	`Generated from \`${path.relative(process.cwd(), inputPath)}\` by`,
	"`scripts/render-claim-graph.mjs`. Do not edit this derived view manually.",
	"",
	`[Open the top-down Graphviz diagram](${svgFilename}) or [inspect its DOT source](${dotFilename}).`,
	"",
	"Read each component from its lowest numbered level to its highest. Every",
	"direct prerequisite appears in an earlier level. Claims inside the same level",
	"do not depend on one another and can be read in any order. These levels are a",
	"dependency-safe hierarchy, not a proposed order for the article.",
	"",
	`The canonical graph has ${claims.size} claims and ${edges.length} direct edges across ${components.length} components. ` +
		`The diagram shows ${reducedEdges.length} edges after hiding ${edges.length - reducedEdges.length} transitively redundant direct edges.`,
	"",
];

components.forEach((component, componentIndex) => {
	layers.push(`## Component ${componentIndex + 1}: ${component.length} claims`, "");
	const componentLevels = [...new Set(component.map((id) => level.get(id)))].sort(
		(left, right) => left - right,
	);

	for (const currentLevel of componentLevels) {
		const levelIds = component.filter((id) => level.get(id) === currentLevel).sort(compareIds);
		const qualifier = currentLevel === 0 ? ": sources" : "";
		layers.push(`### Level ${currentLevel}${qualifier}`, "");

		for (const id of levelIds) {
			const roles = [];
			if (incoming.get(id).size === 0) roles.push("source");
			if (outgoing.get(id).size === 0) roles.push("sink");

			layers.push(`#### ${id}`, "", claims.get(id), "");
			if (roles.length > 0) layers.push(`Role: ${roles.join(" and ")}.`, "");
			layers.push(
				`Direct prerequisites: ${markdownIds(incoming.get(id), "none")}.`,
				"",
				`Direct dependents: ${markdownIds(outgoing.get(id), "none")}.`,
				"",
			);
		}
	}
});

fs.writeFileSync(layersPath, `${layers.join("\n").trimEnd()}\n`);

function wrapLabel(text, width = 42) {
	const words = text.split(/\s+/);
	const lines = [];
	let current = "";

	for (const word of words) {
		if (current.length === 0) {
			current = word;
		} else if (current.length + word.length + 1 <= width) {
			current += ` ${word}`;
		} else {
			lines.push(current);
			current = word;
		}
	}

	if (current.length > 0) lines.push(current);
	return lines;
}

function dotQuote(value) {
	return `"${value.replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("\n", "\\n")}"`;
}

const dot = [
	`// Generated from ${path.basename(inputPath)}. Do not edit this derived view manually.`,
	"digraph ClaimGraph {",
	"  graph [",
	"    rankdir=TB,",
	'    bgcolor="#fbfaf7",',
	'    fontname="Arial",',
	"    fontsize=18,",
	"    labelloc=t,",
	`    label=${dotQuote(
		`Agentic Value Throughput: provisional claim dependencies\n${claims.size} claims, ${reducedEdges.length} edges after transitive reduction, ${components.length} components`,
	)},`,
	"    nodesep=0.16,",
	"    outputorder=edgesfirst,",
	"    pad=0.25,",
	"    ranksep=0.55,",
	"    splines=polyline",
	"  ];",
	"  node [",
	"    shape=box,",
	'    style="rounded,filled",',
	'    color="#77736d",',
	'    fillcolor="#ffffff",',
	'    fontcolor="#1e1b18",',
	'    fontname="Arial",',
	"    fontsize=10,",
	'    margin="0.10,0.07",',
	"    penwidth=1",
	"  ];",
	"  edge [",
	'    color="#9b9790",',
	"    arrowsize=0.55,",
	"    penwidth=0.8",
	"  ];",
	"",
];

components.forEach((component, componentIndex) => {
	dot.push(`  subgraph cluster_component_${componentIndex + 1} {`);
	dot.push(`    label=${dotQuote(`Component ${componentIndex + 1}: ${component.length} claims`)};`);
	dot.push('    color="#c9c5bd";');
	dot.push('    fontcolor="#5c5852";');
	dot.push("    fontsize=12;");
	dot.push('    style="rounded,dashed";');

	for (const id of component) {
		let fillColor = "#ffffff";
		if (componentIndex > 0) fillColor = "#f5e9ff";
		else if (incoming.get(id).size === 0) fillColor = "#eaf4ff";
		else if (outgoing.get(id).size === 0) fillColor = "#fff2df";

		const label = [id, ...wrapLabel(claims.get(id))].join("\n");
		const attributes = [
			`label=${dotQuote(label)}`,
			`tooltip=${dotQuote(claims.get(id))}`,
			`fillcolor=${dotQuote(fillColor)}`,
			`URL=${dotQuote(`${markdownPath}#${id.toLowerCase()}`)}`,
			'target="_top"',
		];
		dot.push(`    ${id} [${attributes.join(", ")}];`);
	}

	dot.push("  }");
	dot.push("");
});

for (const { from, to, reason } of reducedEdges) {
	dot.push(`  ${from} -> ${to} [tooltip=${dotQuote(reason)}];`);
}

dot.push("}", "");
fs.writeFileSync(dotPath, dot.join("\n"));

fs.rmSync(svgPath, { force: true });
const render = spawnSync("dot", ["-Tsvg", dotPath, "-o", svgPath], {
	encoding: "utf8",
});

if (render.error) {
	throw new Error(`Unable to run Graphviz dot: ${render.error.message}`);
}
if (render.status !== 0) {
	throw new Error(`Graphviz failed:\n${render.stderr}`);
}

console.log(`Wrote ${path.relative(process.cwd(), layersPath)}`);
console.log(`Wrote ${path.relative(process.cwd(), dotPath)}`);
console.log(`Wrote ${path.relative(process.cwd(), svgPath)}`);
console.log(
	`${claims.size} claims, ${edges.length} canonical edges, ${reducedEdges.length} rendered edges, ${maxLevel + 1} levels`,
);
