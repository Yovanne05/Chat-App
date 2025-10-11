import { ApiError } from "next/dist/server/api-utils";

export const api = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",

  buildUrl(endpoint: string): string {
    const normalizedBaseUrl = this.baseUrl.replace(/\/$/, "");
    const normalizedEndpoint = endpoint.replace(/^\//, "");
    return `${normalizedBaseUrl}/${normalizedEndpoint}`;
  },

  getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  async get<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      } as HeadersInit,
    });

    if (!response.ok) {
      throw new ApiError(response.status, "Failed to fetch data");
    }
    return response.json();
  },

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      } as HeadersInit,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new ApiError(response.status, "Failed to post data");
    }
    return response.json();
  },

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      } as HeadersInit,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new ApiError(response.status, "Failed to update data");
    }
    return response.json();
  },

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      } as HeadersInit,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new ApiError(response.status, "Failed to patch data");
    }
    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      } as HeadersInit,
    });

    if (!response.ok) {
      throw new ApiError(response.status, "Failed to delete data");
    }
    return response.json();
  },
};
