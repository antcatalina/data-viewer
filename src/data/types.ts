export type ParsedData = {
  columns: string[];
  rows: Record<string, string | number | null>[];
};

export type ColumnType = "number" | "string" | "date" | "unknown";

export type ColumnProfile = {
  name: string;
  type: ColumnType;
  uniqueCount: number;
};

export type ChartSuggestion =
  | { type: "bar"; x: string; y: string }
  | { type: "line"; x: string; y: string }
  | { type: "pie"; name: string; value: string };
