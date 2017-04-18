/**
 * Created by tlakatlekutl on 18.04.17.
 */

const path = require('path');

module.exports = {
  entry: './static/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/dist'),
  },
  watch: true,
  node: {
    fs: 'empty',
  },
  // devtool: 'source-map',
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
    ],
  },
};
