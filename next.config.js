/** @type {import('next').NextConfig} */

const { version } = require("./package.json");

const nextConfig = {
  assetPrefix: ".",
  output: "export",
  images: {
    domains: ["zimo-web-bucket.s3.us-east-2.amazonaws.com", "uimg.ngfiles.com"],
  },
  env: {
    version,
  },
};

module.exports = nextConfig;
