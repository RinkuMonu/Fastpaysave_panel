
import React, { useState, useEffect } from "react";
import { FaBars, FaUserShield, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Topbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Load user from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove token and user from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out",
          timer: 1500,
          showConfirmButton: false,
        });

        // Redirect to login page
        navigate("/login");
      }
    });
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "A";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    return initials || "U";
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "User";
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) return user.firstName;
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition"
          onClick={onToggleSidebar}
        >
          <FaBars className="text-slate-200" />
        </button>
        <div className="flex flex-col">
          <span className="text-sm text-slate-400">Admin Panel</span>
          <span className="text-base font-semibold">FASTag Management</span>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* User Info */}
        <div className="text-right text-xs hidden sm:block">
          <div className="font-medium text-slate-100">
            {user?.role === "admin" ? "Admin" : "User"}
          </div>
          <div className="text-slate-400 text-[11px] truncate max-w-[180px]">
            {getUserDisplayName()}
          </div>
        </div>

        {/* Profile Avatar with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center border border-indigo-400/60 shadow-lg font-semibold text-white">
              {getUserInitials()}
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-slate-700">
                <div className="font-medium text-slate-100 text-sm truncate">
                  {getUserDisplayName()}
                </div>
                <div className="text-xs text-slate-400 mt-1 truncate">
                  {user?.email || user?.mobile || "No contact info"}
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                    {user?.role === "admin" ? "Administrator" : "User"}
                  </span>
                </div>
              </div>

              {/* Profile Link */}
              {/* <button
                onClick={() => {
                  setShowDropdown(false);
                  // You can add navigation to profile page here if needed
                  // navigate("/profile");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 transition"
              >
                <FaUser className="text-slate-400" />
                <span>My Profile</span>
              </button> */}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-300 hover:bg-red-900/20 transition border-t border-slate-700"
              >
                <FaSignOutAlt className="text-red-400" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
}