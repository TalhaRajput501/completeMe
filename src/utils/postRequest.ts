import { ApiResponse } from "../../types/ApiResponse";

export async function postRequest<T>({ url, data }: { url: string; data: T }) {

  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });

  const res: ApiResponse = await r.json();

  if (!res.success) {
    throw new Error(`Failed to post at: ${url}`);
  }

  return res
}
