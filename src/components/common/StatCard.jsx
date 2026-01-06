import React from "react";

export default function StatCard({ label, value, subtitle, icon }) {
  return (
    <div className="rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3 flex items-center gap-3 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-indigo-600/30 flex items-center justify-center">
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-lg font-semibold text-slate-50">{value}</div>
        {subtitle && <div className="text-[11px] text-emerald-400 mt-0.5">{subtitle}</div>}
      </div>
    </div>
  );
}