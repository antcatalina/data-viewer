import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { ParsedData, ChartSuggestion } from "../data/types";

interface ResultsProps {
  data: ParsedData;
  suggestion: ChartSuggestion;
  onBack?: () => void;
}

const COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

const Results = ({
  data,
  suggestion,
  onBack,
}: ResultsProps): React.ReactElement => {
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">(
    suggestion.type
  );
  const [filteredRows, setFilteredRows] = useState(data.rows);
  const [filterValue, setFilterValue] = useState<string>("");
  const [currentSuggestion, setCurrentSuggestion] =
    useState<ChartSuggestion>(suggestion);

  // When user changes chart type
  const handleChartTypeChange = (type: "line" | "bar" | "pie") => {
    setChartType(type);

    if (type === "line" || type === "bar") {
      // Pick numeric columns for y, first column for x
      const firstCol = data.columns[0];
      const numericCol = data.columns.find(
        (c) => typeof data.rows[0][c] === "number"
      );
      if (firstCol && numericCol) {
        setCurrentSuggestion({ type, x: firstCol, y: numericCol });
      }
    } else if (type === "pie") {
      // Pick first string column for name, first numeric for value
      const stringCol = data.columns.find(
        (c) => typeof data.rows[0][c] === "string"
      );
      const numericCol = data.columns.find(
        (c) => typeof data.rows[0][c] === "number"
      );
      if (stringCol && numericCol) {
        setCurrentSuggestion({ type, name: stringCol, value: numericCol });
      }
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter rows if pie chart and filter applied
  useEffect(() => {
    if (
      chartType === "pie" &&
      currentSuggestion.type === "pie" &&
      filterValue
    ) {
      setFilteredRows(
        data.rows.filter((r) => r[currentSuggestion.name] === filterValue)
      );
    } else {
      setFilteredRows(data.rows);
    }
  }, [filterValue, data.rows, chartType, currentSuggestion]);

  const categories =
    chartType === "pie" && suggestion.type === "pie"
      ? Array.from(new Set(data.rows.map((r) => r[suggestion.name])))
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-slate-800/60 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-0 text-center sm:text-left">
            Your Data Visualized
          </h2>
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-semibold transition"
            >
              Upload Another File
            </button>
          )}
        </div>

        {/* Chart controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {["line", "bar", "pie"].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                chartType === type
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "bg-slate-700/50 text-gray-300 hover:bg-slate-700/70"
              }`}
              onClick={() =>
                handleChartTypeChange(type as "line" | "bar" | "pie")
              }
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}

          {categories.length > 0 && (
            <select
              className="px-3 py-2 rounded-full bg-slate-700/50 text-gray-300 focus:outline-none"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="">
                All {suggestion.type === "pie" ? suggestion.name : ""}
              </option>
              {categories
                .filter(
                  (c): c is string | number => c !== null && c !== undefined
                )
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          )}
        </div>

        {/* Chart */}
        <div className="w-full h-80 sm:h-96 mb-6">
          {chartType === "line" &&
            currentSuggestion.type === "line" &&
            currentSuggestion.x &&
            currentSuggestion.y && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredRows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey={currentSuggestion.x} stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    dataKey={currentSuggestion.y}
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            )}

          {chartType === "bar" &&
            currentSuggestion.type === "bar" &&
            currentSuggestion.x &&
            currentSuggestion.y && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredRows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey={currentSuggestion.x} stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey={currentSuggestion.y}
                    fill="#06b6d4"
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

          {chartType === "pie" &&
            currentSuggestion.type === "pie" &&
            currentSuggestion.name &&
            currentSuggestion.value && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredRows.map((r) => ({
                      name: r[currentSuggestion.name],
                      value: r[currentSuggestion.value],
                    }))}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    innerRadius={40}
                    paddingAngle={4}
                    label
                  >
                    {filteredRows.map((_r, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
        </div>

        {/* Show data summary */}
        <div className="overflow-x-auto bg-slate-800/50 rounded-2xl p-4 shadow-lg">
          <table className="min-w-full text-gray-200 text-sm border-collapse">
            <thead>
              <tr className="bg-slate-700/60">
                {data.columns.map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-center font-semibold uppercase tracking-wide text-gray-300"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => (
                <tr
                  key={i}
                  className={`transition-colors duration-200 ${
                    i % 2 === 0 ? "bg-slate-700/30" : "bg-slate-800/30"
                  } hover:bg-slate-700/50 cursor-pointer`}
                >
                  {data.columns.map((col) => (
                    <td key={col} className="px-6 py-3 text-center">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: any): React.ReactElement | null => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-lg p-2 text-white shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default Results;
