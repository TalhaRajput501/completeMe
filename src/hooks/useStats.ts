import { getRequest } from "@/utils/getRequest";
import { useEffect, useState } from "react";
import { ApiResponse } from "../../types/ApiResponse";

export type StatsData = {
  revenue: number;
  order: number;
  products: number;
  activeCustomers: number;
};

export function useStats() {

  const [data, setData] = useState<StatsData>({
    revenue: 0,
    order: 0,
    products: 0,
    activeCustomers: 0,
  });

  useEffect(() => {

    // IIFE 
    (async() => {

      try {

        const r = await getRequest<StatsData>('/api/stats') 
        // if(!r) return
        setData({
          revenue: r.revenue,
          order: r.order,
          products: r.products,
          activeCustomers: r.activeCustomers,
        })

        // return {data.}
      } catch (error) {
        throw error instanceof Error ? error.message : "Unknown error";
      }


    })();
  }, []);
  return data;
}
