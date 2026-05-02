/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/**', // معناه اسمح بأي مسار للصور جوه الدومين ده
      },
    ],
  },
};

export default nextConfig;