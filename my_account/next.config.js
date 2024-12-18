const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // 원래 hostname: 'cdn1.iconfinder.com', 이거인데 cdn1이 바뀔수도 있기 때문에 **넣어줌
        hostname: '**.iconfinder.com',
      },
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig
