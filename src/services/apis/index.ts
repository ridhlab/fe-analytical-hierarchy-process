import { authorizationTokenConfig } from "@/helpers/auth";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api`,
});

export const axiosAuthInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api`,
    headers: authorizationTokenConfig,
});
