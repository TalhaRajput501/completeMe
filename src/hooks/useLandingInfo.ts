import { getRequest } from "@/utils/getRequest";
import React, { useEffect, useState } from "react";
import { LandingInfo } from "../../types/productTypes";


const initialData = {
  _id: "",
  name: "",
  description: "",
  images: [],
  price: 0,
};
const initialLandingInfo: LandingInfo = {
  watch: [initialData, initialData, initialData],
  cloth: [initialData, initialData, initialData],
  shoe: [initialData, initialData, initialData],
};

function useLandingInfo() {
  const [data, setData] = useState<LandingInfo>(initialLandingInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getRequest<LandingInfo>(
          "/api/products?landing=true",
        );
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
