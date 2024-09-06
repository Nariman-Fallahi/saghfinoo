/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thlearn.storage.iran.liara.space',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
