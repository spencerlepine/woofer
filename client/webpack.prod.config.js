// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const webpack = require("webpack")

module.exports = {
  mode: "production",
  resolve: {
    fallback: {
      https: false,
      path: false,
    },
    extensions: [".js", "*"],
    modules: [path.resolve(__dirname, "js"), "node_modules", "src"],
  },
  entry: path.resolve(__dirname, "client", "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "client", "build"),
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
    new Dotenv({ systemvars: true }),

    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),

    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "client", "public", "index.html"),
      filename: "./index.html",
      title: "QuickCart",
      meta: {
        viewport:
          "width=device-width, initial-scale=1,viewport-fit=cover, shrink-to-fit=no",
        "theme-color": "#42b029",
        "apple-mobile-web-app-status-bar-style": "#42b029",
        "og:title": "QuickCart",
        "og:description":
          "Organize and budget a personal grocery cart for easy shopping",
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

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
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
