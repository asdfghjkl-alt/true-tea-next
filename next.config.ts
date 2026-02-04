import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "true-tea.com.au",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
