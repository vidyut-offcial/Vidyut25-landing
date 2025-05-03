/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com'],
  },
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
