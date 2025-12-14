// Updated responsive & enhanced Home component
// Focus: mobile-first typography, spacing, chart responsiveness, accessibility tweaks

import React, { useState } from "react";
import {
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
  ResponsiveContainer,
} from "recharts";
import {
  Upload,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
} from "lucide-react";
import { useParsedData } from "../hooks/useParsedData";
import Results from "./Results";

import Loading from "./Loading";

const Home = (): React.ReactElement => {
  const [dragActive, setDragActive] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { data, suggestion, error } = useParsedData(file);

  /** Data set for line chart example */
  const lineData = [
    { month: "Jan", revenue: 4200, users: 240 },
    { month: "Feb", revenue: 5100, users: 310 },
    { month: "Mar", revenue: 4800, users: 290 },
    { month: "Apr", revenue: 6200, users: 380 },
    { month: "May", revenue: 7100, users: 450 },
    { month: "Jun", revenue: 8300, users: 520 },
  ];

  /** Data set for bar chart example */
  const barData = [
    { category: "North", sales: 8900 },
    { category: "South", sales: 6400 },
    { category: "East", sales: 7200 },
    { category: "West", sales: 9100 },
  ];

  /** Data set for pie chart example */
  const pieData = [
    { name: "Marketing", value: 35, color: "#8b5cf6" },
    { name: "Development", value: 30, color: "#3b82f6" },
    { name: "Operations", value: 20, color: "#06b6d4" },
    { name: "Sales", value: 15, color: "#10b981" },
  ];

  /** Drag handler */
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setShowLoading(true); // start loader

      // Minimum loader time of 3s
      setTimeout(() => {
        setLoadingDone(true);
      }, 3000);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      console.log("File dropped:", droppedFile.name);
      setFile(droppedFile);
      setShowLoading(true);
    }
  };

  const handleReset = () => {
    setFile(null);
    setShowLoading(false);
    setLoadingDone(false);
  };

  /** Props for dark tooltip */
  const darkTooltipProps = {
    contentStyle: {
      backgroundColor: "#1e293b",
      border: "1px solid #475569",
      borderRadius: "8px",
    },
    labelStyle: { color: "#e5e7eb" },
    itemStyle: { color: "#e5e7eb" },
  };

  // Show loader while file uploaded and minimum 3s not done
  if (showLoading && !loadingDone) {
    return <Loading onFinish={() => setLoadingDone(true)} />;
  }

  // Show results only after loader finished AND data available
  if (loadingDone && file && data && suggestion) {
    return <Results data={data} suggestion={suggestion} onBack={handleReset} />;
  }

  // Show error if loader done but data failed
  if (loadingDone && error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error parsing file: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Transform Your Data Into
            <span className="block mt-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Beautiful Insights
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl mx-auto">
            Upload CSV or Excel files and instantly visualize your data — no
            coding, formulas, or setup required.
          </p>
        </div>

        {/* Upload */}
        <div className="max-w-xl mx-auto mb-16">
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-300 ${
              dragActive
                ? "border-purple-400 bg-purple-900/20"
                : "border-gray-600 bg-slate-800/60 hover:border-purple-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-purple-400" />
            <h3 className="text-xl sm:text-2xl font-semibold text-white">
              Drop your file here
            </h3>
            <p className="text-gray-400 mt-2">or tap to browse</p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileInput}
            />
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-gray-500">
              <span>CSV</span>•<span>Excel</span>•<span>10MB max</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Line */}
          <ChartCard
            title="Trend Analysis"
            icon={<TrendingUp className="w-5 h-5 text-purple-400" />}
            description="Understand growth and changes over time."
          >
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip {...darkTooltipProps} />
                <Line dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} />
                <Line dataKey="users" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Bar */}
          <ChartCard
            title="Comparisons"
            icon={<BarChart3 className="w-5 h-5 text-cyan-400" />}
            description="Compare values across categories."
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip {...darkTooltipProps} />
                <Bar dataKey="sales" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Pie */}
          <ChartCard
            title="Proportions"
            icon={<PieIcon className="w-5 h-5 text-emerald-400" />}
            description="See how parts contribute to the whole."
          >
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80}>
                  {pieData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip {...darkTooltipProps} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 text-base sm:text-lg font-semibold text-white hover:scale-105 transition">
            Get Started Free
          </button>
          <p className="text-gray-400 text-sm mt-3">No credit card required</p>
        </div>
      </div>
    </div>
  );
};

const ChartCard = ({ title, icon, description, children }: any) => (
  <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-5 sm:p-6 hover:border-purple-500 transition">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm mb-4">{description}</p>
    {children}
  </div>
);

export default Home;
