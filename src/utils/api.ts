import type { Resource } from "@/types";

// const apiUrl = import.meta.env.DEV ? "http://api.denartcc.local" : "https://api.denartcc.org";
const apiUrl = import.meta.env.DEV ? "https://api.dev.denartcc.org" : "https://api.denartcc.org";

// @TODO Migrate the API calls from any pages to here
export class API {
  static async createOrUpdateResource(resource: Resource): Promise<Resource> {
    const response = await fetch(`${apiUrl}/resources`, {
      method: (resource.id === 0 && "POST") || "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: resource.category,
        description: resource.description,
        name: resource.name,
      }),
    });
    return response.json();
  }
}

export default apiUrl;
