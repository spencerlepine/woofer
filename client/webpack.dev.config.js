// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const InterpolateHtmlPlugin = require("interpolate-html-plugin")
const webpack = require("webpack")

const Dotenv = require("dotenv-webpack")

module.exports = {
  mode: "development",
  resolve: {
    alias: {
      process: "process/browser",
    },
    fallback: {
      fs: false,
      https: false,
      path: false,
      os: false,
    },
    extensions: [".js", "*"],
    modules: [path.resolve(__dirname, "js"), "node_modules", "src"],
  },
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[chunkhash].bundle.js",
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "./index.html",
    }),

    new Dotenv({
      path: "../.env",
      prefix: "process.env.",
    }),

    new InterpolateHtmlPlugin({ PUBLIC_URL: "static" }),
  ],
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: true,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers":
    //     "X-Requested-With, content-type, Authorization",
    // },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
}
