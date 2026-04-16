import { postRequest } from "@/utils/postRequest";
import { useState } from "react";
import type { ApiResponse } from "../../types/ApiResponse";
import type { UserInfoUpdateDto } from "../../types/user";

export function useInfoChange() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function infoChange({ creds }: { creds: UserInfoUpdateDto }) {
    setLoading(true);
    setError(null);

    try {
      const response = await postRequest<UserInfoUpdateDto>({
        url: "/api/user",
        data: creds,
      });

      setData(response);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to update account information";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, infoChange, setError };
}
