import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase() ?? "";

  if (["post", "put", "patch"].includes(method)) {
    if (!config.data) {
      config.data = {};
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
