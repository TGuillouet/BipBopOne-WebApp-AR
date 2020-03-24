const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

require("dotenv").config()

/**
 * Get all the environment variables
 */
const env = Object.keys(process.env).reduce((acc, curr) => {
  acc[curr] = JSON.stringify(process.env[curr]);
  return acc;
}, {});

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new HtmlWebpackPlugin({ title: 'WebAr', template: './src/index.html' })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
