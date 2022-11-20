import axios from "axios";
import type { Resource } from "@/types";

// const apiUrl = import.meta.env.DEV ? "http://api.denartcc.local" : "https://api.denartcc.org";
const apiUrl = import.meta.env.DEV ? "https://api.dev.denartcc.org" : "https://api.denartcc.org";

export const ZDVAPI = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// @TODO Migrate the API calls from any pages to here
export class API {
  static async createOrUpdateResource(resource: Resource): Promise<Resource> {
    const response = await ZDVAPI({
      url: `${apiUrl}/resources`,
      method: (resource.id === 0 && "POST") || "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        category: resource.category,
        description: resource.description,
        name: resource.name,
      },
    });
    return response.data as Resource;
  }
}

export default apiUrl;
