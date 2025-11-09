import axios from "axios";

const BASE_URL = "https://vmt-backend-vkbk.onrender.com/api";

// Create instance
const adminAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // needed for refresh token cookie
});

// Add request interceptor
adminAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401
adminAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint
       const refreshRes = await axios.get("/admin/refresh", {
  baseURL: BASE_URL,
  withCredentials: true,
});


        // Update localStorage token
        localStorage.setItem("adminToken", refreshRes.data.accessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
        return adminAxios(originalRequest);
      } catch (err) {
        // Refresh failed → logout
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default adminAxios;
