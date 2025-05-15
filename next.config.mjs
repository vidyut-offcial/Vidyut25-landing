/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'images.unsplash.com',
      'vidyut-assets.s3.ap-south-1.amazonaws.com',
    ],
  },
  devIndicators: false,
};

export default nextConfig;
