/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.externals = [...(config.externals || []), { 'onnxruntime-node': 'commonjs onnxruntime-node' }];
  
      return config;
    },
  }
  
  export default nextConfig;