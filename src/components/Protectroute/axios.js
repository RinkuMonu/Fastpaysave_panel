import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://1z0th4tl-5000.inc1.devtunnels.ms/api", 
    baseURL: "http://localhost:5000/api",
    timeout: 15000,
});

// Auto attach token before every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Token expire -> redirect to login
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
