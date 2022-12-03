import axios from "axios";
import fac from "@/facility";
import type { Resource } from "@/types";

// const apiUrl = import.meta.env.DEV ? "http://api.denartcc.local" : "https://api.denartcc.org";
const apiUrl = import.meta.env.DEV ? fac.devApiUrl : fac.apiUrl;

export const ZDVAPI = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// @TODO Migrate the API calls from any pages to here
export class API {
  static async createOrUpdateResource(resource: Resource): Promise<Resource> {
    if (resource.id === undefined) {
      // eslint-disable-next-line no-param-reassign
      resource.id = 0;
    }
    const response = await ZDVAPI({
      url: `${apiUrl}/v1/storage${resource.id !== undefined && resource.id !== 0 ? `/${resource.id}` : ""}`,
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

  static async deleteResource(resource: Resource): Promise<void> {
    await ZDVAPI.delete(`${apiUrl}/v1/storage/${resource.id}`);
  }

  static async uploadResource(resource: Resource, file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    await ZDVAPI.put(`${apiUrl}/v1/storage/${resource.id}/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default apiUrl;
