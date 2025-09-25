import axios from "axios";

const AxiosApi = axios.create({
    baseURL: "https://next-blog-817y.vercel.api/api",
});

AxiosApi.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default AxiosApi;