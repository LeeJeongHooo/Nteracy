const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    static: { watch: false },
    hot: true, // HMR 활성화
    devMiddleware: {
      writeToDisk: true,
    },
    allowedHosts: [".youtube.com"],
    client: {
      webSocketURL: "ws://localhost:8080/ws",
    },
  },
});
