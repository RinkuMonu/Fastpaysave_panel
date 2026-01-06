import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../components/Protectroute/axios.js";
import Loader from "./loader";

export default function WalletReport() {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const debounceRef = useRef(null); // 🔥 debounce reference

    const fetchReport = async (pageNo = 1, searchTerm = "", statusTerm = "") => {
        try {
            setLoading(true);

            const res = await axiosInstance.get(
                `/topup/wallet/report?page=${pageNo}&limit=10&search=${searchTerm}&status=${statusTerm}`
            );

            if (res.data.success) {
                setTransactions(res.data.data);
                setPage(res.data.currentPage);
                setTotalPages(res.data.totalPages);
            }
        } catch (error) {
            console.log("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport(1, "", "");
    }, []);

    // 🔥 DEBOUNCED SEARCH HANDLER
    const handleSearch = (value) => {
        setSearch(value);

        clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            fetchReport(1, value, status);
        }, 300); // 300 ms delay
    };

    // 🔥 STATUS CHANGE
    const handleStatusChange = (value) => {
        setStatus(value);
        fetchReport(1, search, value);
    };

    return (
        <div className="space-y-5">

            <div>
                <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
                    Wallet Top-Up Report
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Track wallet credit & top-up transactions.
                </p>
            </div>

            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">

                {/* SEARCH + STATUS FILTER */}
                <div className="flex items-center justify-between mb-3 gap-3">

                    <div className="flex gap-3">

                        {/* SEARCH */}
                        <input
                            type="text"
                            placeholder="Search Txn ID, User, Mobile..."
                            className="w-64 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />

                        {/* STATUS FILTER */}
                        <select
                            className="bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none"
                            value={status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Success">Success</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>

                    <span className="text-xs text-slate-400">
                        Total Records: {transactions.length}
                    </span>
                </div>

                {/* TABLE */}
                <div className="overflow-auto rounded-xl border border-slate-800">
                    <table className="min-w-full text-xs">
                        <thead className="bg-slate-900/80 text-slate-400">
                            <tr>
                                <th className="px-3 py-2 text-left">Txn ID</th>
                                <th className="px-3 py-2 text-left">User</th>
                                <th className="px-3 py-2 text-left">Mobile</th>
                                <th className="px-3 py-2 text-right">Amount</th>
                                <th className="px-3 py-2 text-left">Status</th>
                                <th className="px-3 py-2 text-left">Description</th>
                                <th className="px-3 py-2 text-left">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="py-10 text-center">
                                        <Loader size={40} color="#6366f1" />
                                    </td>
                                </tr>
                            ) : transactions.length > 0 ? (
                                transactions.map((t) => (
                                    <tr key={t._id} className="hover:bg-slate-900/70">

                                        <td className="px-3 py-2 text-slate-100">
                                            {t.transaction_reference_id}
                                        </td>

                                        <td className="px-3 py-2 text-slate-200">
                                            {t.user.firstName} {t.user.lastName}
                                        </td>

                                        <td className="px-3 py-2 text-slate-300">
                                            {t.user.mobile}
                                        </td>

                                        <td className="px-3 py-2 text-right text-slate-100">
                                            ₹ {t.amount.toFixed(2)}
                                        </td>

                                        <td className="px-3 py-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-[11px] ${t.status === "Success"
                                                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                                        : t.status === "Pending"
                                                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                                                            : "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                                                    }`}
                                            >
                                                {t.status}
                                            </span>
                                        </td>

                                        <td className="px-3 py-2 text-slate-300">
                                            {t.description || "N/A"}
                                        </td>

                                        <td className="px-3 py-2 text-slate-300">
                                            {new Date(t.createdAt).toLocaleString()}
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-6 text-center text-slate-500">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="flex justify-between mt-3 text-xs text-slate-300">
                    <button
                        disabled={page === 1}
                        onClick={() => fetchReport(page - 1, search, status)}
                        className="px-3 py-1 bg-slate-800 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span>Page {page} of {totalPages}</span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => fetchReport(page + 1, search, status)}
                        className="px-3 py-1 bg-slate-800 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
}
