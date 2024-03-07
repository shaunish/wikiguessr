const webpack = require('webpack');

webpack.resolve.fallback: { "url": false }

const webpackConfig = {
  resolve: {
    fallback: {
      "url": false,
      "fs": false,
    }
  },
  plugins: [
    new webpack.IgnorePlugin(/^url$/),
    new webpack.IgnorePlugin(/^fs$/),
    new webpack.IgnorePlugin(/^assert$/)
  ],
};
