import * as XLSX from "xlsx";
import type { ParsedData } from "./types";

export const parseExcel = async (file: File): Promise<ParsedData> => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  // Get the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const json: any[] = XLSX.utils.sheet_to_json(sheet, { defval: null });

  if (json.length === 0) throw new Error("Excel sheet is empty");

  const columns = Object.keys(json[0]);

  return {
    columns,
    rows: json,
  };
};
