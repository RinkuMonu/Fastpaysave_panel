import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import FastagRecharge from "./pages/FastagRecharge";
import Settings from "./pages/Settings";
import Login from "./pages/login";
import ProtectedRoute from "./components/Protectroute/protect";
import WalletReport from "./pages/walletreport";

export default function App() {
  const location = useLocation();

  // check if login page
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-50">

      {/* Hide Sidebar on login */}
      {!isLoginPage && <Sidebar />}

      <div className="flex-1 flex flex-col">

        {/* Hide Topbar on login */}
        {!isLoginPage && <Topbar />}

        <main className={`flex-1 ${isLoginPage ? "p-0" : "p-4 md:p-6"}`}>
          <div className={`${isLoginPage ? "" : "max-w-7xl mx-auto"}`}>
            <Routes>
              {/* PUBLIC ROUTE */}
              <Route path="/login" element={<Login />} />

              {/* PROTECTED ROUTES */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/fastag"
                element={
                  <ProtectedRoute>
                    <FastagRecharge />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet"
                element={
                  <ProtectedRoute>
                    <WalletReport />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
