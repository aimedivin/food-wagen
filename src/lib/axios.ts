import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase() ?? "";

  if (["post", "put", "patch"].includes(method)) {
    if (config.data && typeof config.data === "object") {
      config.data = {
        platform: "web",
        ...config.data,
      };
    } else {
      config.data = { platform: "web" };
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 && typeof window !== "undefined") {
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;
