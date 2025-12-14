import type { ParsedData, ColumnProfile, ColumnType } from "./types";

const isDate = (value: string) => !Number.isNaN(Date.parse(value));

export const profileColumns = (data: ParsedData): ColumnProfile[] => {
  return data.columns.map(column => {
    const values = data.rows
      .map(r => r[column])
      .filter(v => v !== null);

    const uniqueCount = new Set(values).size;

    let type: ColumnType = "unknown";

    if (values.every(v => typeof v === "number")) {
      type = "number";
    } else if (
      values.every(v => typeof v === "string" && isDate(v))
    ) {
      type = "date";
    } else if (values.every(v => typeof v === "string")) {
      type = "string";
    }

    return {
      name: column,
      type,
      uniqueCount
    };
  });
};
