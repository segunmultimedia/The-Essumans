import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 78, 80, 85, 88, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
