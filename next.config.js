/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure we handle trailing slashes consistently
  trailingSlash: false,
  // Configure image domains for next/image if needed
  images: {
    domains: ['drive.google.com'],
  },
}

module.exports = nextConfig
