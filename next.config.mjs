/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pakfrag.com',
      },
    ],
  },
}

export default nextConfig;