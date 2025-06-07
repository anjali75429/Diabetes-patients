/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...existing config...
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/login',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'authenticated',
            value: undefined,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;