
// import React, { useState, useEffect, useRef } from "react";
// import Loader from "./loader";
// import axiosInstance from "../components/Protectroute/axios.js";

// export default function FastagRecharge() {
//   const [form, setForm] = useState({
//     tagId: "",
//     vehicleNo: "",
//     customerName: "",
//     mobile: "",
//     amount: "",
//     provider: "npci",
//   });

//   const [recharges, setRecharges] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const debounceRef = useRef(null);

//   // 🔥 Fetch FASTag Recharge Report
//   const fetchReport = async (searchTerm = "", page = 1) => {
//     try {
//       setLoading(true);

//       const res = await axiosInstance.get(
//         `/topup/wallet/report?page=${page}&limit=10&search=${searchTerm}&status=&type=FASTag Recharge`
//       );

//       if (res.data.success) {
//         setRecharges(res.data.data);
//         setCurrentPage(res.data.currentPage || 1);
//         setTotalPages(res.data.totalPages || 1);
//         setTotalRecords(res.data.total || 0);
//       }

//     } catch (err) {
//       console.log("FASTag Report Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchReport("", 1);
//   }, []);

//   // Debounced search
//   const handleSearch = (value) => {
//     setSearch(value);
//     setCurrentPage(1);

//     clearTimeout(debounceRef.current);

//     debounceRef.current = setTimeout(() => {
//       fetchReport(value, 1);
//     }, 300);
//   };

//   // Pagination handlers
//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     fetchReport(search, page);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     alert("FASTag recharge API integration Yaha add karein");
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       let start = Math.max(1, currentPage - 2);
//       let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
//       if (end - start + 1 < maxVisiblePages) {
//         start = Math.max(1, end - maxVisiblePages + 1);
//       }
      
//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }
//     }
    
//     return pages;
//   };

//   return (
//     <div className="space-y-5">

//       <div>
//         <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-50">
//           FASTag Recharge
//         </h1>
//         <p className="text-sm text-slate-400 mt-1">
//           Initiate and track FASTag recharge transactions.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

//         {/* FORM SECTION */}
//         <div className="lg:col-span-1 rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
//           <h2 className="text-sm font-semibold text-slate-100 mb-1">
//             Initiate Recharge
//           </h2>
//           <p className="text-xs text-slate-400 mb-3">
//             Enter FASTag and vehicle details to proceed with recharge.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-3 text-xs">
//             <div>
//               <label className="block mb-1 text-slate-300">
//                 FASTag ID / Wallet ID
//               </label>
//               <input
//                 type="text"
//                 value={form.tagId}
//                 onChange={(e) => setForm({ ...form, tagId: e.target.value })}
//                 className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-slate-300">Vehicle No.</label>
//               <input
//                 type="text"
//                 value={form.vehicleNo}
//                 onChange={(e) => setForm({ ...form, vehicleNo: e.target.value })}
//                 className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 uppercase outline-none"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-slate-300">Customer Name</label>
//               <input
//                 type="text"
//                 value={form.customerName}
//                 onChange={(e) => setForm({ ...form, customerName: e.target.value })}
//                 className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-slate-300">Mobile</label>
//               <input
//                 type="tel"
//                 value={form.mobile}
//                 onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//                 className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-slate-300">Amount (₹)</label>
//               <input
//                 type="number"
//                 value={form.amount}
//                 onChange={(e) => setForm({ ...form, amount: e.target.value })}
//                 min="100"
//                 className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full mt-2 px-3 py-2 rounded-xl bg-indigo-600 text-white font-medium text-xs hover:bg-indigo-500 transition"
//             >
//               Proceed Recharge
//             </button>
//           </form>
//         </div>

//         {/* RECHARGE REPORT */}
//         <div className="lg:col-span-2 rounded-2xl bg-slate-950/60 border border-slate-800 p-4">

//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-sm font-semibold text-slate-100">Recent Recharges</h2>

//             <div className="flex items-center gap-3">
//               <input
//                 type="text"
//                 placeholder="Search FASTag, Mobile, Txn ID..."
//                 value={search}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none w-48"
//               />
//               <div className="text-xs text-slate-400">
//                 Total: {totalRecords}
//               </div>
//             </div>
//           </div>

//           <div className="overflow-auto rounded-xl border border-slate-800">
//             <table className="min-w-full text-xs">

//               <thead className="bg-slate-900/80 text-slate-400">
//                 <tr>
//                   <th className="px-3 py-2 text-left">Txn ID</th>
//                   <th className="px-3 py-2 text-left">FASTag ID</th>
//                   <th className="px-3 py-2 text-left">Customer</th>
//                   <th className="px-3 py-2 text-left">Mobile</th>
//                   <th className="px-3 py-2 text-right">Amount</th>
//                   <th className="px-3 py-2 text-left">Status</th>
//                   <th className="px-3 py-2 text-left">Date</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-800">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="py-10 text-center">
//                       <Loader size={40} />
//                     </td>
//                   </tr>
//                 ) : recharges.length > 0 ? (
//                   recharges.map((r) => (
//                     <tr key={r._id} className="hover:bg-slate-900/70">
//                       <td className="px-3 py-2 text-slate-100">
//                         {r.transaction_reference_id}
//                       </td>
//                       <td className="px-3 py-2 text-slate-200">
//                         {r.inputParameters?.param1 || "N/A"}
//                       </td>
//                       <td className="px-3 py-2 text-slate-200">
//                         {r.user?.firstName} {r.user?.lastName}
//                       </td>
//                       <td className="px-3 py-2 text-slate-200">
//                         {r.user?.mobile}
//                       </td>
//                       <td className="px-3 py-2 text-right text-slate-100">
//                         ₹ {r.amount}
//                       </td>

//                       <td className="px-3 py-2">
//                         <span
//                           className={`px-2 py-1 rounded-full text-[11px] ${r.status === "Success"
//                               ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
//                               : r.status === "Pending"
//                                 ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
//                                 : r.status === "Failed"
//                                   ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
//                                   : "bg-slate-500/15 text-slate-300 border border-slate-500/30"
//                             }`}
//                         >
//                           {r.status}
//                         </span>
//                       </td>

//                       <td className="px-3 py-2 text-slate-300">
//                         {new Date(r.createdAt).toLocaleDateString()}
//                         <br />
//                         <span className="text-xs text-slate-500">
//                           {new Date(r.createdAt).toLocaleTimeString()}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="py-6 text-center text-slate-500">
//                       No FASTag recharges found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>

//             </table>
//           </div>

//           {/* PAGINATION */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between mt-4 px-2">
//               <div className="text-xs text-slate-400">
//                 Showing page {currentPage} of {totalPages}
//               </div>
              
//               <div className="flex items-center gap-1">
//                 {/* Previous Button */}
//                 <button
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`px-3 py-1 rounded-lg text-xs ${currentPage === 1
//                       ? "bg-slate-800 text-slate-500 cursor-not-allowed"
//                       : "bg-slate-700 text-slate-300 hover:bg-slate-600"
//                     }`}
//                 >
//                   Previous
//                 </button>

//                 {/* Page Numbers */}
//                 {getPageNumbers().map((pageNum) => (
//                   <button
//                     key={pageNum}
//                     onClick={() => goToPage(pageNum)}
//                     className={`px-2.5 py-1 rounded-lg text-xs ${currentPage === pageNum
//                         ? "bg-indigo-600 text-white"
//                         : "bg-slate-800 text-slate-300 hover:bg-slate-700"
//                       }`}
//                   >
//                     {pageNum}
//                   </button>
//                 ))}

//                 {/* Next Button */}
//                 <button
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`px-3 py-1 rounded-lg text-xs ${currentPage === totalPages
//                       ? "bg-slate-800 text-slate-500 cursor-not-allowed"
//                       : "bg-slate-700 text-slate-300 hover:bg-slate-600"
//                     }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect, useRef } from "react";
import Loader from "./loader";
import axiosInstance from "../components/Protectroute/axios.js";
import { FaInfoCircle, FaSpinner, FaCreditCard } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

// API base URL
const API_BASE_URL = "https://api.fastpaysave.com/api/instantpay";

export default function FastagRecharge() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  
  const [form, setForm] = useState({
    tagId: "",
    vehicleNo: "",
    customerName: "",
    mobile: "",
    amount: "",
    provider: "npci",
  });

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingBill, setFetchingBill] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [provider, setProvider] = useState("");
  const [billerInfo, setBillerInfo] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [billAmount, setBillAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // New state for API responses
  const [customerName, setCustomerName] = useState("");
  const [customerWallet, setCustomerWallet] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [enquiryReferenceId, setEnquiryReferenceId] = useState("");
  const [externalRef, setExternalRef] = useState("");
  const [selectedBiller, setSelectedBiller] = useState(null);

  // State for biller details - DYNAMIC
  const [billerDetails, setBillerDetails] = useState(null);
  const [billerParams, setBillerParams] = useState([]);
  const [inputFields, setInputFields] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [billerInputConfig, setBillerInputConfig] = useState({});

  // Payment form state
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentModes, setPaymentModes] = useState([]);
  const [initChannels, setInitChannels] = useState([]);
  const [initChannel, setInitChannel] = useState("");

  const [recharges, setRecharges] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const debounceRef = useRef(null);

  // Get token and user info
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken) {
      setToken(storedToken);
    }
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

  // Generate external reference
  const generateExternalRef = () => {
    return `REF${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  // Fetch billers
  const fetchBillers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/billers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filters: {
            categoryKey: "C10",
          },
        }),
      });

      const data = await response.json();

      if (data.success && data.data?.data?.records) {
        const activeBillers = data.data.data.records.filter(
          biller => biller.billerStatus === "ACTIVE" && biller.isAvailable
        );
        setProviders(activeBillers);
        
        // Auto-select first provider if available
        if (activeBillers.length > 0) {
          setProvider(activeBillers[0].billerId);
        }
      }
    } catch (error) {
      console.error("Error fetching billers:", error);
      // Fallback
      setProviders([
        { billerId: "fastag1", billerName: "HDFC FASTag" },
        { billerId: "fastag2", billerName: "ICICI FASTag" },
        { billerId: "fastag3", billerName: "Axis FASTag" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillers();
  }, []);

  // Reset all biller-related state
  const resetBillerState = () => {
    setBillerDetails(null);
    setBillerParams([]);
    setPaymentModes([]);
    setInitChannels([]);
    setInitChannel("");
    setPaymentMode("");
    setInputFields({});
    setInputErrors({});
    setInputErrors({});
    setBillerInputConfig({});
    setCustomerName("");
    setCustomerWallet("");
    setBillNumber("");
    setBillAmount(0);
    setEnquiryReferenceId("");
    setExternalRef("");
    setSelectedBiller(null);
  };

  // Fetch biller details
  const fetchBillerDetails = async (billerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/biller-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          billerId: billerId
        }),
      });

      const data = await response.json();
      console.log("Biller details response:", data);

      if (data.success) {
        const details = data?.data?.data;
        setBillerDetails(details);

        const biller = providers.find(p => p.billerId === billerId);
        setSelectedBiller(biller);

        if (details.parameters && details.parameters.length > 0) {
          const initialFields = {};
          const inputConfig = {};

          details.parameters.forEach(param => {
            initialFields[param.name] = "";
            inputConfig[param.name] = {
              desc: param.desc,
              minLength: param.minLength || 0,
              maxLength: param.maxLength || 999,
              inputType: param.inputType || "ALL",
              mandatory: param.mandatory || 0,
              regex: param.regex || "^.*$",
              compiledRegex: param.regex ? new RegExp(param.regex) : null
            };
          });

          setInputFields(initialFields);
          setBillerInputConfig(inputConfig);
          setBillerParams(details.parameters);
        }

        if (details.paymentModes?.length) {
          setPaymentModes(details.paymentModes);
          setPaymentMode(details.paymentModes[0]?.name || "");
        }

        if (details.initChannels?.length) {
          setInitChannels(details.initChannels);
          setInitChannel(details.initChannels[0]?.name || "");
        }
      }
    } catch (error) {
      console.error("Error fetching biller details:", error);
    }
  };

  useEffect(() => {
    if (provider) {
      fetchBillerDetails(provider);
    } else {
      resetBillerState();
    }
  }, [provider]);

  // Handle input changes in the form
  const handleInputChange = (paramName, value) => {
    const config = billerInputConfig[paramName];

    if (!config) {
      setInputFields(prev => ({
        ...prev,
        [paramName]: value
      }));
      return;
    }

    let cleanedValue = value;

    switch (config.inputType) {
      case "NUMERIC":
        cleanedValue = value.replace(/\D/g, '');
        break;
      case "ALPHANUMERIC":
        cleanedValue = value.replace(/[^a-zA-Z0-9]/g, '');
        break;
      case "ALL":
      default:
        cleanedValue = value;
        break;
    }

    setInputFields(prev => ({
      ...prev,
      [paramName]: cleanedValue
    }));

    setInputErrors(prev => ({
      ...prev,
      [paramName]: ""
    }));
  };

  // Dynamic validation
  const validateInputs = () => {
    const errors = {};
    let isValid = true;

    Object.keys(billerInputConfig).forEach(paramName => {
      const config = billerInputConfig[paramName];
      const value = inputFields[paramName] || "";

      if (config.mandatory === 1 && !value.trim()) {
        errors[paramName] = `${config.desc} is required`;
        isValid = false;
        return;
      }

      if (value.trim()) {
        if (value.length < config.minLength) {
          errors[paramName] = `Minimum ${config.minLength} characters required`;
          isValid = false;
        } else if (value.length > config.maxLength) {
          errors[paramName] = `Maximum ${config.maxLength} characters allowed`;
          isValid = false;
        } else if (config.regex && config.regex !== "^.*$" && config.compiledRegex) {
          try {
            if (!config.compiledRegex.test(value)) {
              errors[paramName] = `Invalid format for ${config.desc}`;
              isValid = false;
            }
          } catch (error) {
            console.error(`Invalid regex pattern for ${paramName}:`, config.regex);
          }
        }
      }
    });

    setInputErrors(errors);
    return isValid;
  };

  // Get device info dynamically
  const getDynamicDeviceInfo = (channelName) => {
    const selectedChannel = initChannels.find(ch => ch.name === channelName);
    const deviceInfo = {};

    if (selectedChannel && selectedChannel.deviceInfo) {
      selectedChannel.deviceInfo.forEach(device => {
        switch (device.name.toLowerCase()) {
          case "terminalid":
          case "terminal_id":
            deviceInfo[device.name] = "TERM001";
            break;
          case "mobile":
          case "mobilenumber":
            deviceInfo[device.name] = "9876543210";
            break;
          case "geocode":
          case "geo_code":
            deviceInfo[device.name] = "19.0760,72.8777";
            break;
          case "postalcode":
          case "postal_code":
            deviceInfo[device.name] = "400001";
            break;
          case "latitude":
            deviceInfo[device.name] = "19.0760";
            break;
          case "longitude":
            deviceInfo[device.name] = "72.8777";
            break;
          default:
            deviceInfo[device.name] = "";
        }
      });
    }

    return deviceInfo;
  };

  // Handle form submission (Generate Bill)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!provider) {
      toast.error("Please select a provider");
      return;
    }

    if (!validateInputs()) {
      return;
    }

    setFetchingBill(true);
    const newExternalRef = generateExternalRef();
    setExternalRef(newExternalRef);

    try {
      const params = {};
      Object.keys(inputFields).forEach(fieldName => {
        if (inputFields[fieldName]) {
          params[fieldName] = inputFields[fieldName];
        }
      });

      const deviceInfo = getDynamicDeviceInfo(initChannel);

      const requestBody = {
        billerId: provider,
        externalRef: newExternalRef,
        initChannel: initChannel || (initChannels[0]?.name || "AGT"),
        ...params,
        ...deviceInfo
      };

      console.log("Pre-enquiry request:", requestBody);

      const response = await fetch(`${API_BASE_URL}/pre-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Pre-enquiry response:", data);

      if (data.success && data.data.statuscode === "TXN") {
        const enquiryData = data.data.data;

        const possibleNameFields = ['CustomerName', 'customerName', 'name', 'AccountHolderName', 'accountHolderName'];
        const possibleAmountFields = ['Amount', 'amount', 'DueAmount', 'dueAmount', 'BillAmount', 'billAmount', 'amountOutstanding'];
        const possibleBillNumberFields = ['BillNumber', 'billNumber', 'ReferenceNumber', 'referenceNumber'];

        let foundName = "N/A";
        let foundAmount = 0;
        let foundBillNumber = "N/A";
        let foundWallet = "N/A";

        // Find customer name
        possibleNameFields.forEach(field => {
          if (enquiryData[field] && foundName === "N/A") {
            foundName = enquiryData[field];
          }
        });

        // Find amount
        possibleAmountFields.forEach(field => {
          if (enquiryData[field] && foundAmount === 0) {
            const amountValue = parseFloat(enquiryData[field]);
            if (!isNaN(amountValue)) {
              foundAmount = amountValue;
            }
          }
        });

        // Find bill number
        possibleBillNumberFields.forEach(field => {
          if (enquiryData[field] && foundBillNumber === "N/A") {
            foundBillNumber = enquiryData[field];
          }
        });

        // Try to find wallet balance from AdditionalDetails
        if (enquiryData.AdditionalDetails && Array.isArray(enquiryData.AdditionalDetails)) {
          const walletDetail = enquiryData.AdditionalDetails.find(
            detail => detail.Key && detail.Key.toLowerCase().includes('balance')
          );
          if (walletDetail && walletDetail.Value) {
            foundWallet = walletDetail.Value;
          }
        }

        setCustomerName(foundName);
        setCustomerWallet(foundWallet);
        setBillNumber(foundBillNumber);
        setBillAmount(foundAmount);
        setEnquiryReferenceId(enquiryData.enquiryReferenceId || enquiryData.referenceId || "");
        setSubmitted(true);

        // Also update the form with customer details
        setForm(prev => ({
          ...prev,
          customerName: foundName,
          amount: foundAmount.toString(),
          mobile: enquiryData.mobile || enquiryData.contactNumber || ""
        }));

      } else {
        const errorMessage = data.data?.status || data.message || "Failed to fetch FASTag details. Please try again.";
        Swal.fire({
          title: "Info",
          text: errorMessage,
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error fetching FASTag details:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setFetchingBill(false);
    }
  };

  // Handle FASTag recharge payment
  // const handlePayBill = async () => {
  //   try {
  //     if (billAmount < 100) {
  //       toast.error("Minimum amount ₹100 is required for recharge");
  //       return;
  //     }

  //     if (!token) {
  //       Swal.fire({
  //         title: "Authentication Required",
  //         text: "Please login to continue.",
  //         icon: "warning",
  //         confirmButtonText: "OK",
  //       });
  //       return;
  //     }

  //     const selectedProvider = providers.find(p => p.billerId === provider);

  //     const res = await fetch(`${API_BASE_URL}/start-fastag-payment`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         userId: user?._id || "admin_user",
  //         amount: billAmount,
  //         billerId: selectedProvider?.billerId,
  //         enquiryReferenceId,
  //         inputParameters: inputFields,
  //         initChannel,
  //         email: user?.email || "admin@fastpaysave.com",
  //         // Include customer details from form
  //         customerName: form.customerName,
  //         mobile: form.mobile,
  //         vehicleNo: form.vehicleNo,
  //         tagId: form.tagId
  //       })
  //     });

  //     const data = await res.json();
  //     console.log("Payment response:", data);

  //     if (data.success) {
  //       // Show success message
  //       Swal.fire({
  //         title: "Success!",
  //         text: "FASTag recharge initiated successfully!",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       }).then(() => {
  //         // Refresh the report
  //         fetchReport(search, currentPage);
  //         // Reset form
  //         handleReset();
  //       });
  //     } else {
  //       Swal.fire({
  //         title: "Error",
  //         text: data.message || "Failed to initiate recharge. Please try again.",
  //         icon: "error",
  //         confirmButtonText: "OK",
  //       });
  //     }
  //   } catch (err) {
  //     console.log("Payment error:", err);
  //     Swal.fire({
  //       title: "Error",
  //       text: "Something went wrong. Please try again.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  // };

  const handlePayBill = async () => {
  try {
    if (billAmount < 100) {
      toast.error("Minimum amount ₹100 is required for recharge");
      return;
    }

    if (!token) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please login to continue.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const selectedProvider = providers.find(p => p.billerId === provider);

    setProcessingPayment(true);

    const res = await fetch(`${API_BASE_URL}/start-fastag-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user?._id || "admin_user",
        amount: billAmount,
        billerId: selectedProvider?.billerId,
        enquiryReferenceId,
        inputParameters: inputFields,
        initChannel,
        email: user?.email || "admin@fastpaysave.com",
        customerName: form.customerName,
        mobile: form.mobile,
        vehicleNo: form.vehicleNo,
        tagId: form.tagId
      })
    });

    const data = await res.json();
    console.log("Payment response:", data);

    if (data.success && data.redirectURL) {
      // Store transaction data before redirecting
      const transactionData = {
        provider: selectedProvider?.billerName,
        amount: billAmount,
        customerName: form.customerName,
        tagId: form.tagId,
        enquiryReferenceId,
        timestamp: new Date().toISOString()
      };
      
      // Store in localStorage to retrieve after payment
      localStorage.setItem('pendingFastagTransaction', JSON.stringify(transactionData));
      
      // Show confirmation before redirecting
      Swal.fire({
        title: "Redirecting to Payment Gateway",
        html: `
          <div class="text-left">
            <p><strong>Provider:</strong> ${selectedProvider?.billerName}</p>
            <p><strong>Amount:</strong> ₹${billAmount}</p>
            <p><strong>FASTag ID:</strong> ${form.tagId || inputFields.param1 || 'N/A'}</p>
            <p class="text-sm text-gray-500 mt-3">You will be redirected to secure payment page...</p>
          </div>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Proceed to Payment",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33"
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to payment gateway
          window.location.href = data.redirectURL;
        } else {
          setProcessingPayment(false);
        }
      });
      
    } else {
      setProcessingPayment(false);
      Swal.fire({
        title: "Error",
        text: data.message || "Failed to initiate recharge. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } catch (err) {
    console.log("Payment error:", err);
    setProcessingPayment(false);
    Swal.fire({
      title: "Error",
      text: "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

  // Handle reset
  const handleReset = () => {
    setProvider("");
    resetBillerState();
    setSubmitted(false);
    setForm({
      tagId: "",
      vehicleNo: "",
      customerName: "",
      mobile: "",
      amount: "",
      provider: "npci",
    });
  };

  // Get input type
  const getInputType = (inputType) => {
    switch (inputType?.toUpperCase()) {
      case "NUMERIC": return "tel";
      case "ALPHANUMERIC": return "text";
      case "PASSWORD": return "password";
      case "EMAIL": return "email";
      case "TEL": return "tel";
      case "ALL":
      default: return "text";
    }
  };

  // Render input field dynamically
  const renderInputField = (paramName) => {
    const config = billerInputConfig[paramName];
    const value = inputFields[paramName] || "";
    const error = inputErrors[paramName];

    if (!config) return null;

    return (
      <div key={paramName} className="space-y-1">
        <label className="block mb-1 text-slate-300">
          {config.desc}
          {config.mandatory === 1 && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          <input
            type={getInputType(config.inputType)}
            value={value}
            onChange={(e) => handleInputChange(paramName, e.target.value)}
            placeholder={`Enter ${config.desc.toLowerCase()}`}
            className={`w-full bg-slate-900/80 border ${error ? "border-red-500" : "border-slate-700"} rounded-lg px-3 py-2 outline-none text-slate-100 ${submitted ? "bg-gray-100 cursor-not-allowed" : ""}`}
            disabled={submitted}
            minLength={config.minLength}
            maxLength={config.maxLength}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FaInfoCircle className="text-gray-400 cursor-help" />
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-xs">{error}</p>
        )}
      </div>
    );
  };

  // Check if all mandatory fields are filled
  const areMandatoryFieldsFilled = () => {
    if (!billerInputConfig || Object.keys(billerInputConfig).length === 0) {
      return false;
    }

    return Object.keys(billerInputConfig).every(paramName => {
      const config = billerInputConfig[paramName];
      if (config.mandatory === 1) {
        const value = inputFields[paramName] || "";
        return value.trim().length >= config.minLength;
      }
      return true;
    });
  };

  // 🔥 Fetch FASTag Recharge Report
  const fetchReport = async (searchTerm = "", page = 1) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/topup/wallet/report?page=${page}&limit=10&search=${searchTerm}&status=&type=FASTag Recharge`
      );

      if (res.data.success) {
        setRecharges(res.data.data);
        setCurrentPage(res.data.currentPage || 1);
        setTotalPages(res.data.totalPages || 1);
        setTotalRecords(res.data.total || 0);
      }
    } catch (err) {
      console.log("FASTag Report Error:", err);
      toast.error("Failed to load recharge history");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchReport("", 1);
  }, []);

  // Debounced search
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchReport(value, 1);
    }, 300);
  };

  // Pagination handlers
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchReport(search, page);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-5">
      <ToastContainer position="top-center" />
      
      <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-50">
          FASTag Recharge
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Initiate and track FASTag recharge transactions for users.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* FORM SECTION */}
        <div className="lg:col-span-1 rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-1">
            Initiate FASTag Recharge
          </h2>
          <p className="text-xs text-slate-400 mb-3">
            Enter FASTag and vehicle details to proceed with recharge.
          </p>

          {/* Provider Selection */}
          <div className="mb-4">
            <label className="block mb-1 text-slate-300">
              FASTag Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none text-slate-100"
              required
            >
              <option value="">-- Choose Provider --</option>
              {providers.map((p) => (
                <option key={p.billerId} value={p.billerId}>
                  {p.billerName}
                </option>
              ))}
            </select>
          </div>

          {/* FASTag ID Form */}
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {billerParams.length > 0 && (
              <div className="space-y-3">
                {Object.keys(billerInputConfig).map(paramName =>
                  renderInputField(paramName)
                )}
              </div>
            )}

            <div>
              <label className="block mb-1 text-slate-300">
                Vehicle No. (Optional)
              </label>
              <input
                type="text"
                value={form.vehicleNo}
                onChange={(e) => setForm({ ...form, vehicleNo: e.target.value.toUpperCase() })}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none text-slate-100 uppercase"
                placeholder="MH12AB1234"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {!submitted ? (
                <button
                  type="submit"
                  className={`flex-1 py-2 rounded-lg font-medium transition flex justify-center items-center gap-2 ${!provider || fetchingBill || !areMandatoryFieldsFilled()
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  disabled={!provider || fetchingBill || !areMandatoryFieldsFilled()}
                >
                  {fetchingBill ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Fetching...
                    </>
                  ) : (
                    "Fetch FASTag Details"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2 rounded-lg font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
                >
                  New Recharge
                </button>
              )}
            </div>
          </form>

          {/* Bill Details Display */}
          {submitted && (
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700 mt-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <FaCreditCard /> FASTag Details
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer Name:</span>
                  <span className="text-slate-100 font-medium">{customerName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-400">Wallet Balance:</span>
                  <span className="text-slate-100 font-medium">{customerWallet}</span>
                </div>
                
                {Object.keys(inputFields).map(fieldName => {
                  const config = billerInputConfig[fieldName];
                  const value = inputFields[fieldName];
                  if (!value || !config) return null;

                  return (
                    <div key={fieldName} className="flex justify-between">
                      <span className="text-slate-400">{config.desc}:</span>
                      <span className="text-slate-100 font-medium">{value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Recharge Amount</p>
                    <input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
                      className="text-lg font-bold text-slate-100 bg-slate-800 border border-slate-700 rounded-md px-2 py-1 w-32"
                      min="100"
                    />
                  </div>
                  <button
                    onClick={handlePayBill}
                    disabled={processingPayment}
                    className="py-2 px-4 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition flex items-center gap-2 disabled:bg-green-800"
                  >
                    {processingPayment ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaCreditCard />
                    )}
                    {processingPayment ? "Processing..." : "Recharge Now"}
                  </button>
                </div>
                
                <div className="text-xs text-slate-500 mt-2">
                  <p>Reference: <span className="font-mono">{enquiryReferenceId?.substring(0, 12)}...</span></p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RECHARGE REPORT */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-950/60 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-100">Recent Recharges</h2>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search FASTag, Mobile, Txn ID..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-xs outline-none w-48 text-slate-100"
              />
              <div className="text-xs text-slate-400">
                Total: {totalRecords}
              </div>
            </div>
          </div>

          <div className="overflow-auto rounded-xl border border-slate-800">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-3 py-2 text-left">Txn ID</th>
                  <th className="px-3 py-2 text-left">FASTag ID</th>
                  <th className="px-3 py-2 text-left">Customer</th>
                  <th className="px-3 py-2 text-left">Mobile</th>
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
                      <td className="px-3 py-2 text-slate-100">
                        {r.transaction_reference_id}
                      </td>
                      <td className="px-3 py-2 text-slate-200">
                        {r.inputParameters?.param1 || "N/A"}
                      </td>
                      <td className="px-3 py-2 text-slate-200">
                        {r.user?.firstName} {r.user?.lastName}
                      </td>
                      <td className="px-3 py-2 text-slate-200">
                        {r.user?.mobile}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-100">
                        ₹ {r.amount}
                      </td>

                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-[11px] ${r.status === "Success"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : r.status === "Pending"
                                ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                                : r.status === "Failed"
                                  ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                                  : "bg-slate-500/15 text-slate-300 border border-slate-500/30"
                            }`}
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="px-3 py-2 text-slate-300">
                        {new Date(r.createdAt).toLocaleDateString()}
                        <br />
                        <span className="text-xs text-slate-500">
                          {new Date(r.createdAt).toLocaleTimeString()}
                        </span>
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

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-2">
              <div className="text-xs text-slate-400">
                Showing page {currentPage} of {totalPages}
              </div>
              
              <div className="flex items-center gap-1">
                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg text-xs ${currentPage === 1
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-2.5 py-1 rounded-lg text-xs ${currentPage === pageNum
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg text-xs ${currentPage === totalPages
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}