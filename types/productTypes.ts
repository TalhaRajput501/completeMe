import { ProductType } from "@/schemas/product.schema"; 
import { LucideIcon } from "lucide-react";

// local storage product
export interface eachCartProduct {
  product: string;
  quantity: number;
}

export type cartProduct = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  qtyToBuy: number;
};

export type ProductInfoCardProps = {
  id: string;
  link: string;
  imageSrc: string;
  name: string;
  description: string;
  iconName: LucideIcon;
  price: number;
};

export type LandingInfo = {
  watch: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
  }[];
  cloth: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
  }[];
  shoe: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
  }[];
};

// Wish List types
export type WishProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  note?: string;
};

export type wishListInLocal = {
  product: string;
  note: string;
}

export type ProductCategory = ProductType['category']
export type FilterOption = "newest" | "price-low" | "price-high" | "name"