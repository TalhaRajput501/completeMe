'use client';
import { useState } from "react";
import type { ProductType } from "@/schemas/product.schema";
import { postRequest } from "@/utils/postRequest";
import type { ApiResponse } from "../../types/ApiResponse";

type CreateProductArgs = {
  product: ProductType;
  images: File[];
};

// type CreatedProduct = ProductType & {
//   _id?: string;
// };

export function useProductCreate() {
  const [data, setData] = useState<CreateProductArgs | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createProduct({ product, images }: CreateProductArgs) {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("product", JSON.stringify(product));
      images.forEach((file) => formData.append("images", file));

      console.log("FormData entries:", [...formData.entries()]);

      const response = await postRequest<FormData, CreateProductArgs>({
        url: "/api/products",
        data: formData,
      });
      if (!response) {
        throw new Error("No response from server");
      }
      console.log("API response:", response);

      if(!response.data) throw new Error(response.message || "Failed to create product");
      setData(response?.data);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to add product";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, createProduct, setError };
}
