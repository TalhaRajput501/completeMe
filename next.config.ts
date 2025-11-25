import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['plus.unsplash.com', 'www.lamborghini.com', "images.unsplash.com",'res.cloudinary.com', 'media.istockphoto.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i, 
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
