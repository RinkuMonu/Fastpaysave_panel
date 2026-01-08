import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../components/Protectroute/axios.js";
import Loader from "./loader";

export default function ContactUs() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  // Fetch All Contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/contact/all");
      if (res.data.success) {
        setContacts(res.data.data || []);
      }
    } catch (err) {
      Swal.fire("Error", "Failed to fetch contacts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // View Contact Details
  const handleView = async (id) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/contact/${id}`);
      if (res.data.success) {
        setSelectedContact(res.data.data);
        setViewMode(true);
      }
    } catch (err) {
      Swal.fire("Error", "Failed to fetch contact details", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete Contact
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setLoadingDelete(true);
        const res = await axiosInstance.delete(`/contact/${id}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "Contact has been deleted.", "success");
          fetchContacts();
          setSelectedContact(null);
          setViewMode(false);
        }
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Failed to delete contact", "error");
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* CONTACTS LIST */}
      <div className="lg:col-span-2 rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-slate-50">Contact Us Messages</h1>
          <span className="text-xs text-slate-400">Total: {contacts.length}</span>
        </div>

        <div className="overflow-auto rounded-xl border border-slate-800">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-900/80 text-slate-400">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Email</th>
                <th className="px-3 py-2 text-left font-medium">Mobile</th>
                <th className="px-3 py-2 text-left font-medium">Message</th>
                <th className="px-3 py-2 text-left font-medium">Date</th>
                <th className="px-3 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-3 py-8 text-center">
                    <div className="flex justify-center">
                      <Loader size={40} color="#6366f1" />
                    </div>
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-slate-900/70">
                    {/* NAME */}
                    <td className="px-3 py-2 text-slate-100">
                      <div className="font-medium text-nowrap">{contact.fullName}</div>
                    </td>

                    {/* EMAIL */}
                    <td className="px-3 py-2 text-slate-200">
                      <div className="truncate max-w-[150px]" title={contact.email}>
                        {contact.email}
                      </div>
                    </td>

                    {/* MOBILE */}
                    <td className="px-3 py-2 text-slate-200">{contact.mobile}</td>

                    {/* MESSAGE PREVIEW */}
                    <td className="px-3 py-2 text-slate-300">
                      <div className="truncate max-w-[200px]" title={contact.message}>
                        {contact.message.length > 50
                          ? `${contact.message.substring(0, 50)}...`
                          : contact.message}
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-3 py-2 text-slate-400">
                      <div className="text-[10px] text-nowrap">
                        {formatDate(contact.createdAt)}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-3 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleView(contact._id)}
                          className="text-blue-300 text-[11px] hover:text-blue-200"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          disabled={loadingDelete}
                          className="text-red-300 text-[11px] hover:text-red-200 disabled:opacity-50"
                        >
                          {loadingDelete ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}

              {!loading && contacts.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-3 py-6 text-center text-slate-500">
                    No contact messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONTACT DETAILS VIEW */}
      <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
        <h2 className="text-sm font-semibold text-slate-100 mb-1">
          {viewMode ? "Contact Details" : "Select a contact to view"}
        </h2>

        {!selectedContact ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Select a contact message to view details
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            {/* PROFILE HEADER */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-sm text-white font-semibold">
                {selectedContact.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {selectedContact.fullName}
                </h3>
                <p className="text-slate-400 text-[10px]">
                  {formatDate(selectedContact.createdAt)}
                </p>
              </div>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-3">
              <div>
                <label className="block mb-1 text-slate-300">Email</label>
                <div className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-200">
                  {selectedContact.email}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-300">Mobile</label>
                <div className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-200">
                  {selectedContact.mobile}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-300">Message</label>
                <div className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 min-h-[100px]">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleDelete(selectedContact._id)}
                disabled={loadingDelete}
                className="flex-1 px-3 py-2 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 border border-red-500/30 disabled:opacity-50"
              >
                {loadingDelete ? "Deleting..." : "Delete Message"}
              </button>
              <button
                onClick={() => {
                  setSelectedContact(null);
                  setViewMode(false);
                }}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700/70 border border-slate-600/30"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}