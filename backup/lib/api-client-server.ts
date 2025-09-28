import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

class ApiClientServer {
  private baseUrl: string;
  private token: string | undefined;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = cookies().get("access_token")?.value;
  }

  private getAuthHeaders(): Headers {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (this.token) {
      headers.set("Authorization", `Bearer ${this.token}`);
    }

    return headers;
  }

  async get(path: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Failed to fetch ${path}`);
    }

    return await response.json();
  }
}

export const apiClientServer = new ApiClientServer();