import type { ParsedData } from "./types";

export const parseCSV = async (file: File): Promise<ParsedData> => {
  const text = await file.text();
  const lines = text.split(/\r?\n/).filter(Boolean);

  if (lines.length < 2) {
    throw new Error("CSV must have at least one row of data");
  }

  const columns = lines[0].split(",").map((c) => c.trim());

  const rows = lines.slice(1).map((line) => {
    const values = line.split(",");
    const row: Record<string, string | number | null> = {};

    columns.forEach((col, i) => {
      const raw = values[i]?.trim() ?? null;
      const num = Number(raw);

      row[col] =
        raw === null || raw === "" ? null : !Number.isNaN(num) ? num : raw;
    });

    return row;
  });

  return { columns, rows };
};
