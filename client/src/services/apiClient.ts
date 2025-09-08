import {ApiError} from "next/dist/server/api-utils";

export const apiClient = {

    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",

    buildUrl(endpoint: string): string {
        const normalizedBaseUrl = this.baseUrl.replace(/\/$/, '');
        const normalizedEndpoint = endpoint.replace(/^\//, '');
        return `${normalizedBaseUrl}/${normalizedEndpoint}`;
    },

    async get<T>(endpoint: string): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            credentials: "include",
        });

        if (!response.ok) {
            throw new ApiError(response.status, "Failed to fetch data");
        }

        return response.json();
    },

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        const url = this.buildUrl(endpoint);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!response.ok) {
            throw new ApiError(response.status, "Failed to post data");
        }

        return response.json();
    },
};