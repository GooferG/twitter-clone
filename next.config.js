/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['cloudflare-ipfs.com', 'localhost'],
//   },
// };

// module.exports = nextConfig;

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com', 'localhost'],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
