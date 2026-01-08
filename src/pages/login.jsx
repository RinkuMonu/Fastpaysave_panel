import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../components/Protectroute/axios.js"

export default function Login() {
    const navigate = useNavigate();

    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    // --------------- SEND OTP -----------------
    const handleSendOtp = async () => {
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            return Swal.fire("Invalid Mobile", "Enter valid 10-digit mobile number.", "warning");
        }

        setLoading(true);
        try {
            const res = await axiosInstance.post("/auth/send-otp", { mobile });

            if (res.data.success) {
                Swal.fire("OTP Sent!", "Please check your phone.", "success");
                setOtpSent(true);
            } else {
                Swal.fire("Error", res.data.message, "error");
            }
        } catch (err) {
            Swal.fire("Error", err?.response?.data?.message || "Failed to send OTP.", "error");
        }
        setLoading(false);
    };

    // --------------- VERIFY OTP -----------------
    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            return Swal.fire("Invalid OTP", "Please enter 6-digit OTP.", "warning");
        }

        setLoading(true);
        try {
            const res = await axiosInstance.post("/auth/verify-otp", { mobile, otp });

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: `Welcome user`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                // Save token + user
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));


                if (res.data.user.role !== "admin") {
                    Swal.fire({
                        icon: "error",
                        title: "Unauthorized",
                        text: "You are not allowed to access admin dashboard",
                    });

                    // optional: token clear karna ho to
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    return;
                }

                navigate("/");

            } else {
                Swal.fire("Failed", res.data.message, "error");
            }
        } catch (err) {
            Swal.fire("Error", err?.response?.data?.message || "OTP invalid.", "error");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-xl">

                <h1 className="text-xl font-semibold text-slate-100 text-center mb-2">
                    FASTag Login
                </h1>
                <p className="text-xs text-slate-400 text-center mb-6">
                    Login using your mobile number
                </p>

                {/* MOBILE INPUT */}
                <div className="space-y-3 text-sm">
                    <div>
                        <label className="block mb-1 text-slate-300">Mobile Number</label>
                        <input
                            type="tel"
                            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500"
                            value={mobile}
                            maxLength={10}
                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                            disabled={otpSent}
                        />
                    </div>

                    {!otpSent ? (
                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="w-full px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    ) : (
                        <>
                            {/* OTP INPUT */}
                            <div>
                                <label className="block mb-1 text-slate-300">Enter OTP</label>
                                <input
                                    type="tel"
                                    maxLength={6}
                                    className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                />
                            </div>

                            <button
                                onClick={handleVerifyOtp}
                                disabled={loading}
                                className="w-full px-3 py-2 rounded-xl bg-green-600 hover:bg-green-500 transition text-white font-medium"
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
