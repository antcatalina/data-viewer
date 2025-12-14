import type { ColumnProfile, ChartSuggestion } from "./types";

export const suggestChart = (
  profiles: ColumnProfile[]
): ChartSuggestion | null => {
  const numeric = profiles.filter((p) => p.type === "number");
  const categorical = profiles.filter((p) => p.type === "string");
  const dates = profiles.filter((p) => p.type === "date");

  // 📈 Time series
  if (dates.length >= 1 && numeric.length >= 1) {
    return {
      type: "line",
      x: dates[0].name,
      y: numeric[0].name,
    };
  }

  // 📊 Bar chart
  if (categorical.length >= 1 && numeric.length >= 1) {
    return {
      type: "bar",
      x: categorical[0].name,
      y: numeric[0].name,
    };
  }

  // 🥧 Pie chart (categorical + numeric)
  if (categorical.length >= 1 && numeric.length >= 1) {
    return {
      type: "pie",
      name: categorical[0].name,
      value: numeric[0].name,
    };
  }

  return null;
};
