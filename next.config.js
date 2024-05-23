const path = require('path');

module.exports = {
  output: "export",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.publicPath = '/next/';
    }
    return config;
  },
  distDir: 'extension', // Carpeta de salida personalizada
};