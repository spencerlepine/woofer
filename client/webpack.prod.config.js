// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const InterpolateHtmlPlugin = require("interpolate-html-plugin")
const webpack = require("webpack")

module.exports = {
  mode: "production",
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

    new webpack.ProvidePlugin({
      process: "process/browser",
    }),

    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new webpack.EnvironmentPlugin(["SERVER_URL"]),
    new webpack.EnvironmentPlugin(["PORT"]),
    new webpack.EnvironmentPlugin(["MONGODB_URL"]),
    new webpack.EnvironmentPlugin(["SKIP_PREFLIGHT_CHECK"]),
    new webpack.EnvironmentPlugin(["REACT_APP_FIREBASE_API_KEY"]),
    new webpack.EnvironmentPlugin(["REACT_APP_FIREBASE_AUTH_DOMAIN"]),
    new webpack.EnvironmentPlugin(["REACT_APP_FIREBASE_PROJECT_ID"]),
    new webpack.EnvironmentPlugin(["REACT_APP_FIREBASE_STORAGE_BUCKET"]),
    new webpack.EnvironmentPlugin(["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"]),
    new webpack.EnvironmentPlugin(["REACT_APP_FIREBASE_APP_ID"]),
    new webpack.EnvironmentPlugin(["REACT_APP_FIREBASE_MEASUREMENT_ID"]),

    // new webpack.DefinePlugin({
    //   "process.env.REACT_APP_FIREBASE_API_KEY": JSON.stringify(
    //     process.env.REACT_APP_FIREBASE_API_KEY
    //   ),
    //   "process.env.NODE_ENV": JSON.stringify("production"),
    // }),

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
