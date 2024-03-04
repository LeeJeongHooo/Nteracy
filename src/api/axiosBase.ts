import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "https://dgnewsbb.net/",
};

export const instance = axios.create({
  baseURL: axiosConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const imgInstance = axios.create({
  baseURL: axiosConfig.baseURL,
});

export const accessInstance = axios.create({
  baseURL: axiosConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const youtubeInstance = axios.create({
  baseURL: "https://www.youtube.com/",
});
