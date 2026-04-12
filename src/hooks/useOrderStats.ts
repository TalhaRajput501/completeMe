import { useEffect, useState } from "react";
import { ApiResponse } from "../../types/ApiResponse";

export function useOrderStats() {
  const [data, setData] = useState<number | null>(null);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/orders/stats");

        const d: ApiResponse<number> = await res.json();
        if (d.error || !d.data) {
          setError('Failed to fetch stats.')
          return;
        }

        setData(d.data);
        return data;
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error ')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, []);


  return {data, error, isLoading}
}
