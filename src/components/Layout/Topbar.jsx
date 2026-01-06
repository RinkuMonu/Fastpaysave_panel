import React from "react";
import { FaBars, FaUserShield } from "react-icons/fa";

export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-slate-700"
          onClick={onToggleSidebar}
        >
          <FaBars className="text-slate-200" />
        </button>
        <div className="flex flex-col">
          <span className="text-sm text-slate-400">Admin Panel</span>
          <span className="text-base font-semibold">FASTag Management</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right text-xs hidden sm:block">
          <div className="font-medium text-slate-100">Super Admin</div>
          <div className="text-slate-400 text-[11px]">admin@fastagpanel.com</div>
        </div>
        <div className="w-9 h-9 rounded-full bg-indigo-600/80 flex items-center justify-center border border-indigo-400/60 shadow">
          <FaUserShield className="text-sm" />
        </div>
      </div>
    </header>
  );
}