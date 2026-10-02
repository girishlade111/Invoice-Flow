import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages project site: https://girishlade111.github.io/Invoice-Flow
  basePath: '/Invoice-Flow',
  assetPrefix: '/Invoice-Flow/',
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
