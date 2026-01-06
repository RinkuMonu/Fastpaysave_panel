import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCar, FaCog, FaWallet } from "react-icons/fa";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
  { key: "wallet", label: "Wallet", icon: <FaWallet />, path: "/wallet" },
  { key: "users", label: "Users", icon: <FaUsers />, path: "/users" },
  { key: "fastag", label: "FASTag Recharge", icon: <FaCar />, path: "/fastag" },
  { key: "settings", label: "Settings", icon: <FaCog />, path: "/settings" },
];

export default function Sidebar({ active }) {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-slate-950 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-lg font-semibold tracking-tight">
          FASTag <span className="text-indigo-400">Admin</span>
        </span>
      </div>

      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.key}
            className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition
              ${active === item.key
                ? "bg-indigo-600/20 text-indigo-300 border-r-4 border-indigo-500"
                : "text-slate-300 hover:bg-slate-800/80"
              }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="px-5 py-4 text-xs text-slate-500 border-t border-slate-800">
        © {new Date().getFullYear()} FASTag Admin Panel
      </div>
    </aside>
  );
}
