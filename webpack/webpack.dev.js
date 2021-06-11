const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: false,
    inline: true,
    port: 8000
  }
};

module.exports = merge(common, dev);
