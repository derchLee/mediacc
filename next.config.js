// 不使用插件（在 next.config.js 中无法加载）
// 直接配置 webpack，尝试解决 Edge Runtime 模块解析问题

/** @type {import('next').NextConfig} */
const nextConfig = {
  // WebAssembly 支持
  webpack: (config, { isServer, webpack }) => {
    // 移除所有 alias 配置，因为 Edge Runtime 不允许绕过 exports 字段

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };

      // 解决 FFmpeg.wasm 在 Next.js 中的模块解析问题
      // 关键：完全禁用 Webpack 对动态导入的拦截
      
      // 修改 resolve 配置，忽略特定路径
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      
      // 修改 module 配置
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      
      // FFmpeg.wasm 核心文件应该作为静态资源处理，不经过 Webpack 模块解析
      // 关键：确保 /ffmpeg/ 路径下的文件被 Next.js 作为静态资源处理
      // 这些文件在 public 目录下，Next.js 会自动将其作为静态资源提供服务
    } else {
      // 服务器端：确保 next-intl 模块正确解析
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }

    // 优化 WASM 文件处理
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },

  // 永久重定向配置（308）用于 SEO
  async redirects() {
    return [
      {
        source: '/',
        destination: '/image',
        permanent: true, // 308 永久重定向
      },
      {
        source: '/ja',
        destination: '/ja/image',
        permanent: true,
      },
      {
        source: '/es',
        destination: '/es/image',
        permanent: true,
      },
      {
        source: '/pt',
        destination: '/pt/image',
        permanent: true,
      },
    ];
  },

  // 配置 HTTP 响应头以支持 SharedArrayBuffer（ffmpeg.wasm 多线程必需）
  // 注意：COOP/COEP 头部可能阻止某些爬虫访问，但这是 ffmpeg.wasm 多线程的必需配置
  // Googlebot 应该能够处理这些头部
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          // 添加安全头部
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // 性能优化
  compress: true,
  
  // 启用 standalone 输出模式（用于 Docker 部署）
  output: 'standalone',
  
  // 图片优化（可选，因为我们主要处理用户上传的文件）
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;

