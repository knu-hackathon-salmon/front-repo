import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

import { QueryClient } from "@tanstack/react-query";

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
    const instance = axios.create({
        timeout: 20000,
        ...config,
        headers: {
            "Content-Type": "application/json",
            ...config.headers,
        },
        withCredentials: true,
        // proxy: {
        //     host: "35.184.36.31",
        //     port: 8080,
        // },
    });
    axios.defaults.withCredentials = true;
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response && error.response.status === 401) {
                try {
                    const refreshResponse = await instance.get(`${BASE_URL}/api/jwt/reissue`, {
                        withCredentials: true,
                    });
                    console.log(refreshResponse.data);

                    return instance(originalRequest); // 재요청
                } catch (refreshError) {
                    console.error("토큰 갱신 실패:", refreshError);
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        },
    );

    return instance;
};

export const BASE_URL = "http://35.184.36.31:8080";
export const fetchInstance = initInstance({
    baseURL: BASE_URL,
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnMount: true,
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
        },
    },
});
