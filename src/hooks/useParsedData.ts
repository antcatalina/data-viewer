import { useEffect, useState } from "react";
import type { ParsedData, ColumnProfile, ChartSuggestion } from "../data/types";
import { parseCSV } from "../data/parseCSV";
import { profileColumns } from "../data/profileColumns";
import { suggestChart } from "../data/suggestChart";
import { parseExcel } from "../data/parseExcel";

export const useParsedData = (file: File | null) => {
  const [data, setData] = useState<ParsedData | null>(null);
  const [profiles, setProfiles] = useState<ColumnProfile[]>([]);
  const [suggestion, setSuggestion] = useState<ChartSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const run = async () => {
      try {
        let parsed;

        if (file.name.endsWith(".csv")) {
          parsed = await parseCSV(file);
        } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          parsed = await parseExcel(file);
        } else {
          throw new Error("Unsupported file type");
        }

        const profiled = profileColumns(parsed);
        const chart = suggestChart(profiled);

        setData(parsed);
        setProfiles(profiled);
        setSuggestion(chart);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    run();
  }, [file]);

  return { data, profiles, suggestion, error };
};
