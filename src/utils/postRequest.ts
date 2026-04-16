import type { ApiResponse } from "../../types/ApiResponse";

export async function postRequest<TRequest, TResponse = unknown>({
  url,
  data,
}: {
  url: string;
  data: TRequest;
}) {

  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  });

  const res: ApiResponse<TResponse> = await r.json();

  if (!r.ok || !res.success) {
    throw new Error(res.error || res.message || `Failed to post at: ${url}`);
  }

  return res;
}
