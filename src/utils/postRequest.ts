import type { ApiResponse } from "../../types/ApiResponse";

export async function postRequest<TRequest, TResponse = unknown>({
  url,
  data,
}: {
  url: string;
  data: TRequest;
}) {
  try {
    const requestInit: RequestInit = {
      method: "POST",
    };

    if (data instanceof FormData) {
      requestInit.body = data;
    } else {
      requestInit.headers = {
        "Content-Type": "application/json",
      };
      requestInit.body = JSON.stringify(data);
    }

    const r = await fetch(url, requestInit);

    const res: ApiResponse<TResponse> = await r.json();

    if (!res.success || !r.ok) {
      throw new Error(res.message);
    }

    return res;
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : `Failed to post at: ${url}`,
    );
  }
}
