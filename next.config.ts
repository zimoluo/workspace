import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  assetPrefix: ".",
  output: "export",
  images: {
    domains: ["zimo-web-bucket.s3.us-east-2.amazonaws.com"],
  },
  env: {
    version,
  },
};

export default nextConfig;
