"use strict";
const path = require("path");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = (env = {}) => ({
  context: path.resolve(__dirname, "src"),
  entry: {
    app: "./app.ts",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(svg)$/i,
        use: {
          loader: "svg-url-loader",
          options: {},
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { babelrc: true },
          },
          {
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/] },
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new WebpackBar(),
    new VueLoaderPlugin(),
  ].filter(Boolean),
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, "src/public"),
    index: "./index.html",
    hot: true,
    stats: "minimal",
    quiet: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    historyApiFallback: true,
  },
});
