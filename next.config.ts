import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        pathname: "/**",
        hostname: "images.unsplash.com",
      },
    
        {
          protocol: "https",
          hostname: "picsum.photos",
          pathname: "/**", // Allow all paths under picsum.photos
        },
        {
          protocol: "https",
          hostname: "cdn.shopify.com",
          pathname: "/**", // Allow all paths under example.com/images/
        }
    ]
  }
};

export default nextConfig;
