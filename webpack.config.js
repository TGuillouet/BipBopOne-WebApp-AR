const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  // resolve: {
  //   alias: {
  //       'node_modules': path.join(__dirname, 'node_modules'),
  //   }
  // },
  plugins: [
    new HtmlWebpackPlugin({ title: 'WebAr', template: './src/index.html' })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};