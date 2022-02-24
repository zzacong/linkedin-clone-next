/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'firebasestorage.googleapis.com',
    ],
  },
}

module.exports = nextConfig
