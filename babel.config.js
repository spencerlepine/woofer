module.exports = function (api) {
  api.cache(true)

  const presets = [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ]
  const plugins = ["@babel/syntax-dynamic-import", "@babel/plugin-transform-runtime"]

  return {
    presets,
    plugins,
  }
}
