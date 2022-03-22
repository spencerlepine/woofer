// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const webpack = require("webpack")

module.exports = {
  mode: "development",
  resolve: {
    fallback: {
      https: false,
      path: false,
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
    new Dotenv(),

    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "./index.html",
    }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: true,
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
