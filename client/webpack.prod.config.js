// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const InterpolateHtmlPlugin = require("interpolate-html-plugin")
const webpack = require("webpack")

const Dotenv = require("dotenv-webpack")

module.exports = {
  mode: "production",
  resolve: {
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules\/(?!antd\/).*/,
          name: "vendors",
          chunks: "all",
        },
        // This can be your own design library.
        antd: {
          test: /node_modules\/(antd\/).*/,
          name: "antd",
          chunks: "all",
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: true,
  },
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),

    new Dotenv({
      path: "../.env",
      prefix: "process.env.",
    }),

    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "./index.html",
      title: "Woofer",
      meta: {
        viewport:
          "width=device-width, initial-scale=1,viewport-fit=cover, shrink-to-fit=no",
        "theme-color": "#42b029",
        "apple-mobile-web-app-status-bar-style": "#42b029",
        "og:title": "Woofer",
        "og:description": "Dating app for dogs, a full stack MERN project",
        "content-type": {
          "http-equiv": "content-type",
          content: "text/html; charset=UTF-8",
        },
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),

    new InterpolateHtmlPlugin({ PUBLIC_URL: "static" }),
  ],
  performance: {
    hints: "warning",
    // Calculates sizes of gziped bundles.
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js.gz")
    },
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
        use: ["css-loader", "sass-loader"],
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
