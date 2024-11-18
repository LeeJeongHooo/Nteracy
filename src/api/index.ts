import axios, { AxiosRequestConfig } from "axios";

interface AxiosConfig extends Omit<AxiosRequestConfig, "url" | "params"> {}

const BASE_URL = "https://dgnewsbb.net/";

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

const instance = axios.create({
  baseURL: axiosConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  GET: <T>(url: string, params?: unknown, config?: AxiosConfig) =>
    instance.get<T>(url, { params, ...config }),
  POST: <T>(url: string, params?: unknown, config?: AxiosConfig) =>
    instance.post<T>(url, params, config),
  PUT: <T>(url: string, params?: unknown, config?: AxiosConfig) =>
    instance.put<T>(url, params, config),
  PATCH: <T>(url: string, params?: unknown, config?: AxiosConfig) =>
    instance.patch<T>(url, params, config),
  DELETE: <T>(url: string, params?: unknown, config?: AxiosConfig) =>
    instance.delete<T>(url, { params, ...config }),
};
