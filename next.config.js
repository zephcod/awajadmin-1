/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ["pbs.twimg.com","gennbi.com","uploadthing.com"],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
       ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;