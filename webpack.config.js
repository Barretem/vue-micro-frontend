const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: 'src/index.js',
  },
  output: {
    publicPath: '/',
    filename: '[name].[hash:5].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    open: true,
    port: 8000,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      '/deepexi-cloud': {
        target: 'http://localhost:9527/'
      }
    }
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/project.config.js') },
      { from: path.resolve(__dirname, 'src/assets') },
    ]),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/templates/index.html') }),
  ],
  devtool: 'source-map',
  externals: [
  ]
};
