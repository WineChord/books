// Shared spec types used by DiagramFlow, DiagramSequence, DiagramState, and
// DiagramAscii. The data is intentionally declarative so chapter authors and
// build-time scripts can serialise mermaid/ASCII content into JSON.

export type Lang = "en" | "zh";

export type Bilingual = string | { en: string; zh: string };

export function pickLabel(value: Bilingual | undefined, lang: Lang): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? "";
}

export type Tone =
  | "default"
  | "accent"
  | "success"
  | "warning"
  | "info"
  | "muted"
  | "danger";

export type NodeShape =
  | "rect"
  | "rounded"
  | "pill"
  | "circle"
  | "diamond"
  | "hex"
  | "cylinder"
  | "parallelogram"
  | "note";

export interface FlowNode {
  id: string;
  label: Bilingual;
  // Optional secondary text, rendered smaller below the label.
  sub?: Bilingual;
  shape?: NodeShape;
  tone?: Tone;
  // Grid placement; required when no absolute coordinates are provided.
  col?: number;
  row?: number;
  colSpan?: number;
  rowSpan?: number;
  // Optional subgraph / lane id (must match a lane.id or subgraph.id).
  group?: string;
  // Manual width/height overrides in grid units (1 = one cell).
  widthUnits?: number;
  heightUnits?: number;
}

export type EdgeStyle = "solid" | "dashed" | "dotted";
export type ArrowHead = "filled" | "open" | "none" | "double";

export interface FlowEdge {
  from: string;
  to: string;
  label?: Bilingual;
  style?: EdgeStyle;
  tone?: Tone;
  arrow?: ArrowHead;
  // Optional routing hint for edges that should not take the auto path.
  // "h" forces horizontal-then-vertical, "v" forces vertical-then-horizontal,
  // "curve" forces a bezier curve, "loop" draws a self loop on the right.
  route?: "auto" | "h" | "v" | "curve" | "loop";
  // Optional waypoint as fraction of the rect midpoint when drawing curve.
  bend?: number;
}

export interface FlowSubgraph {
  id: string;
  label?: Bilingual;
  tone?: Tone;
  // Inclusive bounds in grid coordinates; if omitted, the bounding box of the
  // member nodes is used.
  col?: number;
  row?: number;
  colSpan?: number;
  rowSpan?: number;
}

export interface FlowSpec {
  // Number of grid columns and rows. Cell size is computed from width/height.
  cols: number;
  rows: number;
  // Display dimensions in pixels. Defaults: 720 x (rows * 110).
  width?: number;
  height?: number;
  // Padding inside the SVG viewport.
  padding?: number;
  nodes: FlowNode[];
  edges: FlowEdge[];
  subgraphs?: FlowSubgraph[];
  // Optional caption / legend bilingual text shown below the canvas.
  legend?: Bilingual;
  // Whether to enable the click-to-highlight interaction. Default true.
  interactive?: boolean;
}

export interface SequenceActor {
  id: string;
  label: Bilingual;
  tone?: Tone;
}

export type SequenceMessageKind = "sync" | "async" | "reply" | "self";

export interface SequenceStep {
  // Source / target actor ids. For notes, use the same id for both.
  from: string;
  to: string;
  label: Bilingual;
  kind?: SequenceMessageKind;
  tone?: Tone;
  // Optional note that is drawn over the actor lifeline.
  note?: Bilingual;
}

export interface SequenceSpec {
  actors: SequenceActor[];
  steps: SequenceStep[];
  legend?: Bilingual;
}

export interface StateNode {
  id: string;
  label: Bilingual;
  // 'initial' / 'terminal' are special markers; render as a filled disc.
  kind?: "default" | "initial" | "terminal" | "choice";
  tone?: Tone;
  col?: number;
  row?: number;
}

export interface StateTransition {
  from: string;
  to: string;
  label?: Bilingual;
  tone?: Tone;
  style?: EdgeStyle;
}

export interface StateSpec {
  cols: number;
  rows: number;
  states: StateNode[];
  transitions: StateTransition[];
  legend?: Bilingual;
}
