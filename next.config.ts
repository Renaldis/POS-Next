import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  devIndicators: false,
  images: {
    domains: ["https://gawmomghensoejvpabhk.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gawmomghensoejvpabhk.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
