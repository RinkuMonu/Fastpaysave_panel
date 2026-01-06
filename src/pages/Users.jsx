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
      const res = await axiosInstance.get("/auth/all-users");
      if (res.data.success) {
        setUsers(res.data.data);
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
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage || "",
    });
  };

  // Submit Create/Update
  const handleSubmit = async (e) => {
    setLoadingEdit(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("mobile", form.mobile);
    formData.append("role", form.role);

    // 🟢 ADD USER ID HERE
    formData.append("userId", selectedUser._id);


    try {
      const res = await axiosInstance.put("/auth/update-profile", formData);
      console.log(res)

      if (res.data?.success || res.data?.data?.success) {
        Swal.fire("Updated!", res.data?.message || "User updated successfully", "success");
        fetchUsers();
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoadingEdit(false)

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
            {
              loading ? <div className="absolute inset-0 flex items-center justify-center">
                <Loader size={40} color="#6366f1" />
              </div> :
                <tbody className="divide-y divide-slate-800">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-900/70">

                      {/* PROFILE IMAGE */}
                      <td className="px-3 py-2">
                        {/* {u.profileImage ? (
                      <img
                        src={u.profileImage}
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : ( */}
                        <div className="toUppercase w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white">
                          {u.firstName[0]} {u.lastName[0]}
                        </div>
                        {/* )} */}
                      </td>

                      {/* FULL NAME */}
                      <td className="px-3 py-2 text-slate-100">
                        {u.firstName} {u.lastName}
                      </td>

                      <td className="px-3 py-2 text-slate-200">{u.mobile}</td>
                      <td className="px-3 py-2 text-slate-300">{u.email}</td>

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
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-3 py-6 text-center text-slate-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
            }
          </table>
        </div>

      </div>

      {/* USER FORM */}
      <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">

        <h2 className="text-sm font-semibold text-slate-100 mb-1">
          {/* {selectedUser ? "Edit User" : "Create User"} */}
          Update User
        </h2>

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

          {/* PROFILE IMAGE PREVIEW */}
          {/* {form.profileImage && (
            <img
              src={form.profileImage}
              alt="preview"
              className="w-16 h-16 rounded-md object-cover mt-2"
            />
          )} */}

          <button
            type="submit"
            disabled={loadingEdit}
            className="w-full mt-2 px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
          >
            {loadingEdit ? "Updating..." :
              "Update User"}
          </button>

        </form>
      </div>
    </div>
  );
}
