
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../components/Protectroute/axios.js";
import Loader from "./loader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    role: "user",
    profileImage: "",
  });

  // Fetch All Users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/auth");
      if (res.data.success) {
        // FIX: API returns res.data.users, not res.data.data
        setUsers(res.data.users || []);
      }
    } catch (err) {
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Edit User
  const handleEdit = (user) => {
    setSelectedUser(user);
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      mobile: user.mobile || "",
      email: user.email || "",
      role: user.role || "user",
      profileImage: user.profileImage || "",
    });
  };

  // Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedUser) {
      Swal.fire("Error", "No user selected", "error");
      return;
    }
    
    setLoadingEdit(true);

    try {
      // FIX: Your API endpoint is /api/auth/:id for PUT, not /api/auth/update-profile
      const res = await axiosInstance.put(`/auth/${selectedUser._id}`, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
        role: form.role,
      });

      console.log("Update response:", res);

      if (res.data?.success) {
        Swal.fire("Updated!", "User updated successfully", "success");
        fetchUsers();
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* USERS LIST */}
      <div className="lg:col-span-2 rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-slate-50">Users</h1>
          <span className="text-xs text-slate-400">Total: {users.length}</span>
        </div>

        <div className="overflow-auto rounded-xl border border-slate-800">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-400">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Profile</th>
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Mobile</th>
                <th className="px-3 py-2 text-left font-medium">Email</th>
                <th className="px-3 py-2 text-left font-medium">Role</th>
                <th className="px-3 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                // FIX: Move the loader to a table row instead of a div
                <tr>
                  <td colSpan="6" className="px-3 py-8 text-center">
                    <div className="flex justify-center">
                      <Loader size={40} color="#6366f1" />
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-900/70">
                    {/* PROFILE IMAGE */}
                    <td className="px-3 py-2">
                      <div className="toUppercase w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white">
                        {/* FIX: Handle empty names */}
                        {u.firstName ? u.firstName[0] : ""}
                        {u.lastName ? u.lastName[0] : ""}
                      </div>
                    </td>

                    {/* FULL NAME */}
                    <td className="px-3 py-2 text-slate-100">
                      {u.firstName || ""} {u.lastName || ""}
                    </td>

                    <td className="px-3 py-2 text-slate-200">{u.mobile}</td>
                    <td className="px-3 py-2 text-slate-300">{u.email || "-"}</td>

                    {/* ROLE */}
                    <td className="px-3 py-2 capitalize">
                      <span className="px-2 py-1 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                        {u.role}
                      </span>
                    </td>

                    {/* EDIT BUTTON */}
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => handleEdit(u)}
                        className="text-indigo-300 text-[11px] hover:text-indigo-200"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}

              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-3 py-6 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* USER FORM */}
      <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
        <h2 className="text-sm font-semibold text-slate-100 mb-1">
          Update User {selectedUser ? `- ${selectedUser.firstName || ""}` : ""}
        </h2>

        {!selectedUser ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Select a user to edit
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block mb-1 text-slate-300">First Name</label>
              <input
                type="text"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300">Last Name</label>
              <input
                type="text"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300">Mobile</label>
              <input
                type="tel"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-slate-300">Email</label>
              <input
                type="email"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block mb-1 text-slate-300">Role</label>
              <select
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loadingEdit}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {loadingEdit ? "Updating..." : "Update User"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}