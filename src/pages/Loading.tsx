import React, { useEffect, useState } from "react";
import { BarChart3, LineChart, PieChart, Sparkles } from "lucide-react";

const slides = [
  {
    icon: LineChart,
    title: "Detecting trends",
    description:
      "Identifying time-based patterns and growth signals in your data.",
  },
  {
    icon: BarChart3,
    title: "Comparing categories",
    description: "Finding top performers and meaningful comparisons.",
  },
  {
    icon: PieChart,
    title: "Analyzing proportions",
    description: "Breaking totals into clear, understandable segments.",
  },
  {
    icon: Sparkles,
    title: "Optimizing visuals",
    description: "Choosing the clearest chart types for your data.",
  },
];

interface LoadingProps {
  onFinish?: () => void; // optional callback when loading is done
}

const Loading: React.FC<LoadingProps> = ({ onFinish }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Slide rotation
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Minimum loading time of 3 seconds
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const SlideIcon = slides[index].icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="w-full max-w-md text-center bg-slate-800/60 border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <BarChart3 className="w-12 h-12 text-purple-400" />
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Building your charts
        </h2>
        <p className="text-gray-400 mb-6">
          Analyzing your data and preparing visualizations…
        </p>

        <div className="relative h-28 mb-6">
          <div
            key={index}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-900/60 border border-slate-700 px-4 animate-fade"
          >
            <SlideIcon className="w-6 h-6 text-cyan-400" />
            <p className="text-sm font-medium text-white">
              {slides[index].title}
            </p>
            <p className="text-xs text-gray-400">{slides[index].description}</p>
          </div>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse" />
        </div>

        <p className="text-xs text-gray-500 mt-4">
          This usually takes just a moment
        </p>
      </div>
    </div>
  );
};

export default Loading;
