import { getRequest } from "@/utils/getRequest";
import React, { useEffect, useState } from "react";

export type LandingInfo = {
  watch: {
    _id: string;
    name: string;
    description: string;
    images: string[];
  }[];
  cloth: {
    _id: string;
    name: string;
    description: string;
    images: string[];
  }[];
  shoe: {
    _id: string;
    name: string;
    description: string;
    images: string[];
  }[];
}

function useLandingInfo() {
  const [data, setData] = useState<LandingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate an API call
        const response = await getRequest<LandingInfo>("/api/products?landing=true"); 
        setData(response);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

export default useLandingInfo;
