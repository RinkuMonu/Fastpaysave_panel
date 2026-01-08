import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRupeeSign, FaUsers, FaCarSide, FaClock, FaExclamationTriangle, FaHistory } from "react-icons/fa";
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

  // Calculate total today's transactions
  const totalTodayTransactions = data.today.pending + data.today.success + data.today.failed;
  const totalOverallTransactions = data.overall.pending + data.overall.success + data.overall.failed;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-50">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Quick snapshot of users, FASTag recharges, and transaction performance.
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={data.totalUsers}
          subtitle="Registered Users"
          icon={<FaUsers className="text-indigo-400" />}
        />

        <StatCard
          label="Total FASTag Recharges"
          value={data.totalFastagRecharges}
          subtitle="All Transactions"
          icon={<FaCarSide className="text-emerald-400" />}
        />

        <StatCard
          label="Total E-Chalan"
          value={data.totalEchalan}
          subtitle="E-Chalan Count"
          icon={<FaCarSide className="text-amber-400" />}
        />

        <StatCard
          label="Recharge Volume"
          value={`₹${data.rechargeVolume}`}
          subtitle="Total Amount"
          icon={<FaRupeeSign className="text-rose-400" />}
        />
      </div>

      {/* SECOND ROW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Success Rate</div>
              <div className="mt-1 text-2xl font-bold text-emerald-400">
                {data.successRate}%
              </div>
            </div>
            <FaCheckCircle className="text-2xl text-emerald-400" />
          </div>
        </div>

        {/* Today's Stats Summary Cards */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Today's Success</div>
              <div className="mt-1 text-2xl font-bold text-emerald-400">
                {data.today.success}
              </div>
            </div>
            <FaCheckCircle className="text-xl text-emerald-400" />
          </div>
          <div className="text-xs text-slate-500 mt-1">Transactions</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Today's Pending</div>
              <div className="mt-1 text-2xl font-bold text-amber-300">
                {data.today.pending}
              </div>
            </div>
            <FaClock className="text-xl text-amber-300" />
          </div>
          <div className="text-xs text-slate-500 mt-1">Transactions</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400">Today's Failed</div>
              <div className="mt-1 text-2xl font-bold text-rose-400">
                {data.today.failed}
              </div>
            </div>
            <FaExclamationTriangle className="text-xl text-rose-400" />
          </div>
          <div className="text-xs text-slate-500 mt-1">Transactions</div>
        </div>
      </div>

      {/* TODAY VS OVERALL SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* TODAY'S SUMMARY */}
        <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <FaClock className="text-amber-300" />
              Today's Summary
            </h2>
            <span className="text-xs text-slate-400">
              {totalTodayTransactions} total transactions
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Pending</span>
              <span className="text-lg font-semibold text-amber-300">
                {data.today.pending}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Success</span>
              <span className="text-lg font-semibold text-emerald-400">
                {data.today.success}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Failed</span>
              <span className="text-lg font-semibold text-rose-400">
                {data.today.failed}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Total Today</span>
                <span className="text-lg font-bold text-slate-100">
                  {totalTodayTransactions}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* OVERALL SUMMARY */}
        <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <FaHistory className="text-indigo-400" />
              Overall Summary
            </h2>
            <span className="text-xs text-slate-400">
              {totalOverallTransactions} total
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Pending</span>
              <span className="text-lg font-semibold text-amber-300">
                {data.overall.pending}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Success</span>
              <span className="text-lg font-semibold text-emerald-400">
                {data.overall.success}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Failed</span>
              <span className="text-lg font-semibold text-rose-400">
                {data.overall.failed}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 font-medium">Total Overall</span>
                <span className="text-lg font-bold text-slate-100">
                  {totalOverallTransactions}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-3">
            Quick Actions
          </h2>

          <div className="space-y-2 text-sm flex flex-col">
            <Link
              to="/users"
              className="w-full px-3 py-2 rounded-xl bg-indigo-600 text-sm font-medium hover:bg-indigo-500 transition text-center"
            >
              User List
            </Link>

            <Link 
              to="/fastag" 
              className="w-full px-3 py-2 rounded-xl bg-slate-900 text-slate-100 border border-slate-700 hover:bg-slate-800 transition text-center"
            >
              Start FASTag Recharge
            </Link>

            <Link 
              to="/wallet" 
              className="w-full px-3 py-2 rounded-xl bg-slate-900 text-slate-100 border border-slate-700 hover:bg-slate-800 transition text-center"
            >
              View Reports
            </Link>
          </div>

          {/* STATS INFO */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-500">
              <p>• Success Rate: Based on overall transactions</p>
              <p>• Recharge Volume: Total ₹ amount processed</p>
              <p>• E-Chalan: Total e-chalan entries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}