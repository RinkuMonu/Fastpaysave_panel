import React from "react";

export default function Settings() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-50">
          Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure admin preferences and FASTag API credentials (placeholder).
        </p>
      </div>

      <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4 text-xs space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-100 mb-1">API Credentials</h2>
          <p className="text-slate-400 mb-3">
            Yahan aap FASTag provider ke API key, secret, URL, callback URL wagaira config karoge.
            Abhi ye sirf UI placeholder hai.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-slate-300">API Key</label>
              <input
                type="text"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Enter API key"
              />
            </div>
            <div>
              <label className="block mb-1 text-slate-300">API Secret</label>
              <input
                type="password"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Enter API secret"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-slate-300">Base URL</label>
              <input
                type="text"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="https://api.fastag-provider.com"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-500 transition">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}