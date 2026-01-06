import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRupeeSign, FaUsers, FaCarSide } from "react-icons/fa";
import StatCard from "../components/common/StatCard";
import axiosInstance from "../components/Protectroute/axios.js";
import Loader from "./loader";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Dashboard API
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/topup/dashboard");
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log("Dashboard API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader size={45} color="#6366f1" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-50">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Quick snapshot of users, FASTag recharges, and today's performance.
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={data.totalUsers}
          subtitle="+ Today"
          icon={<FaUsers />}
        />

        <StatCard
          label="Total FASTag Recharges"
          value={data.totalFastagRecharges}
          subtitle="All Time"
          icon={<FaCarSide />}
        />

        <StatCard
          label="Recharge Volume"
          value={`₹ ${data.rechargeVolume.toLocaleString()}`}
          subtitle="Last 30 Days"
          icon={<FaRupeeSign />}
        />

        <StatCard
          label="Success Rate"
          value={`${data.successRate}%`}
          subtitle={
            <span className="flex items-center gap-1">
              <FaCheckCircle /> Live
            </span>
          }
          icon={<FaCheckCircle />}
        />
      </div>

      {/* TODAY SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-100">
              Today's Recharge Summary
            </h2>
            <span className="text-xs text-slate-400">
              Last updated: few seconds ago
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400">Pending</div>
              <div className="mt-1 text-lg font-semibold text-amber-300">
                {data.today.pending}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400">Success</div>
              <div className="mt-1 text-lg font-semibold text-emerald-400">
                {data.today.success}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400">Failed</div>
              <div className="mt-1 text-lg font-semibold text-rose-400">
                {data.today.failed}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400">Refund Initiated</div>
              <div className="mt-1 text-lg font-semibold text-sky-400">
                {data.today.refund}
              </div>
            </div>

          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-3">
            Quick Actions
          </h2>

          <div className="space-y-2 text-sm flex justify-between flex-col">
            <Link
              to="/users"
              className="w-full px-3 py-2 rounded-xl bg-indigo-600 text-sm font-medium hover:bg-indigo-500 transition"
            >
              User List
            </Link>


            <Link to="/fastag" className="w-full px-3 py-2 rounded-xl bg-slate-900 text-slate-100 border border-slate-700 hover:bg-slate-800 transition">
              Start FASTag Recharge
            </Link>

            <Link to="/wallet" className="w-full px-3 py-2 rounded-xl bg-slate-900 text-slate-100 border border-slate-700 hover:bg-slate-800 transition">
              View Today's Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
