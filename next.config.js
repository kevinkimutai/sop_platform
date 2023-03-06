/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  env: {
    MONGODB_URL:
      "mongodb+srv://kevingrand:grand254@grnd.ajlox.mongodb.net/sop_db?retryWrites=true&w=majority",
    NEXT_AUTH_SECRET: "etY5STdFhG5Wpyt",
    SECRET_ACCESS_TOKEN_JWT: "jwt-access-token-FD>$?!U+k5XQVq6",
    SECRET_REFRESH_TOKEN_JWT: "jwt-refresh-token-etY5STdFhG5Wpyt",
    REFRESH_TOKEN_EXPIRES_IN: "90d",
    ACCESS_TOKEN_EXPIRES_IN: "30m",
  },
  api: {
    bodyParser: false,
  },
};

module.exports = nextConfig;
