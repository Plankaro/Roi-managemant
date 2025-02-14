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
        hostname: "github.com",
        pathname: "/**", // Allow all paths under picsum.photos
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
        },
        {
          protocol: 'https',
          hostname: 'scontent.whatsapp.net',
          pathname: '/**', // '**' is a glob pattern to match any path under /v/
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/**', // '**' is a glob pattern to match any path under /v/
        },
        {
          protocol: 'https',
          hostname: 'wallpapercave.com',
          pathname: '/**', // '**' is a glob pattern to match any path under /v/
        }
        

    ]
  }
};

export default nextConfig;
