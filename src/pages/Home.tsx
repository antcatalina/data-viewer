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
import { Upload, TrendingUp, BarChart3, Slice } from "lucide-react";

const Home = (): React.ReactElement => {
  const [dragActive, setDragActive] = useState(false);

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
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  /** Drop handler */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Transform Your Data Into
            <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mt-2">
              Beautiful Insights
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Upload CSV or Excel files and instantly visualize your data with
            stunning, interactive charts. No coding required.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? "border-purple-400 bg-purple-900/20 scale-105"
                : "border-gray-600 bg-slate-800/50 hover:border-purple-500 hover:bg-slate-800/70"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              Drop your file here
            </h3>
            <p className="text-gray-400 mb-6">or click to browse</p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.files
                  ? console.log("File selected:", e.target.files[0]?.name)
                  : null;
              }}
            />
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>CSV</span>
              <span>•</span>{" "}
              <span>Excel</span>{" "}
              <span>•</span>{" "}
              <span>Up to 10MB</span>
            </div>
          </div>
        </div>

        {/* Features Headline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            See Your Data Come to Life
          </h2>
          <p className="text-lg text-gray-400">
            Choose from multiple chart types to tell your data story
          </p>
        </div>

        {/* Chart Examples */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Line Chart Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Trend Analysis
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Track changes over time with smooth, animated line charts. Perfect
              for revenue, growth metrics, and time-series data.
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Comparisons</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Compare categories side-by-side with vibrant bar charts. Ideal for
              regional data, product performance, and rankings.
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Bar dataKey="sales" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Slice className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Proportions</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Visualize parts of a whole with colorful pie charts. Great for
              budget breakdowns, market share, and distributions.
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            Get Started Free
          </button>
          <p className="text-gray-400 mt-4">
            No credit card required • Instant setup
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
