const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CrxLoadScriptWebpackPlugin = require("@cooby/crx-load-script-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [ReactRefreshTypeScript()],
            }),
          },
        },
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader", "postcss-loader"],
        test: /\.css$/i,
      },
    ],
  },
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
  plugins: [
    new ReactRefreshPlugin({ overlay: false }),
    new CrxLoadScriptWebpackPlugin(),
  ],
});
