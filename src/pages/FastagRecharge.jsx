import React, { useState, useEffect, useRef } from "react";
import Loader from "./loader";
import axiosInstance from "../components/Protectroute/axios.js";

export default function FastagRecharge() {
  const [form, setForm] = useState({
    tagId: "",
    vehicleNo: "",
    customerName: "",
    mobile: "",
    amount: "",
    provider: "npci",
  });

  const [recharges, setRecharges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debounceRef = useRef(null);

  // 🔥 Fetch FASTag Recharge Report
  const fetchReport = async (searchTerm = "") => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/topup/wallet/report?page=1&limit=20&search=${searchTerm}&status=&type=FASTag Recharge,`
      );

      if (res.data.success) {
        setRecharges(res.data.data);
      }

    } catch (err) {
      console.log("FASTag Report Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchReport("");
  }, []);

  // Debounced search
  const handleSearch = (value) => {
    setSearch(value);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchReport(value);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("FASTag recharge API integration Yaha add karein");
  };

  return (
    <div className="space-y-5">

      <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-50">
          FASTag Recharge
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Initiate and track FASTag recharge transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* FORM SECTION */}
        <div className="lg:col-span-1 rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-1">
            Initiate Recharge
          </h2>
          <p className="text-xs text-slate-400 mb-3">
            Enter FASTag and vehicle details to proceed with recharge.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block mb-1 text-slate-300">
                FASTag ID / Wallet ID
              </label>
              <input
                type="text"
                value={form.tagId}
                onChange={(e) => setForm({ ...form, tagId: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300">Vehicle No.</label>
              <input
                type="text"
                value={form.vehicleNo}
                onChange={(e) => setForm({ ...form, vehicleNo: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 uppercase outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300">Customer Name</label>
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300">Mobile</label>
              <input
                type="tel"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300">Amount (₹)</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                min="100"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 px-3 py-2 rounded-xl bg-indigo-600 text-white font-medium text-xs hover:bg-indigo-500 transition"
            >
              Proceed Recharge
            </button>
          </form>
        </div>

        {/* RECHARGE REPORT */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-950/60 border border-slate-800 p-4">

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-100">Recent Recharges</h2>

            <input
              type="text"
              placeholder="Search FASTag, Mobile, Txn ID..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none"
            />
          </div>

          <div className="overflow-auto rounded-xl border border-slate-800">
            <table className="min-w-full text-xs">

              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-3 py-2 text-left">Txn ID</th>
                  <th className="px-3 py-2 text-left">FASTag ID</th>
                  <th className="px-3 py-2 text-left">Vehicle</th>
                  <th className="px-3 py-2 text-left">Customer</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-10 text-center">
                      <Loader size={40} />
                    </td>
                  </tr>
                ) : recharges.length > 0 ? (
                  recharges.map((r) => (
                    <tr key={r._id} className="hover:bg-slate-900/70">
                      <td className="px-3 py-2 text-slate-100">{r.transaction_reference_id}</td>
                      <td className="px-3 py-2 text-slate-200">{r.fastagId || "N/A"}</td>
                      <td className="px-3 py-2 text-slate-200">{r.vehicleNo || "N/A"}</td>
                      <td className="px-3 py-2 text-slate-200">{r.customerName}</td>
                      <td className="px-3 py-2 text-right text-slate-100">₹ {r.amount}</td>

                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-[11px] ${r.status === "Success"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : r.status === "Pending"
                                ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                                : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                            }`}
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="px-3 py-2 text-slate-300">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-6 text-center text-slate-500">
                      No FASTag recharges found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
