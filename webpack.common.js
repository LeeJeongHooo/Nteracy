const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CrxLoadScriptWebpackPlugin = require("@cooby/crx-load-script-webpack-plugin");
const { ProvidePlugin } = require("webpack");

const isDev = process.env.NODE !== "production";

const getHtmlPlugins = (chunks) => {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
};

module.exports = {
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  entry: {
    popup: path.resolve("./src/popup/Popup.tsx"),
    background: path.resolve("./src/background/background.ts"),
    content: path.resolve("./src/content/index.tsx"),
  },
  output: {
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: isDev,
            getCustomTransformers: () => ({
              before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
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
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/i,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    isDev && new ReactRefreshPlugin({ overlay: false }),
    isDev && new CrxLoadScriptWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve("src/static"), to: path.resolve("dist") },
        {
          from: path.resolve("src/assets/images"),
          to: path.resolve("dist/"),
        },
      ],
    }),
    new ProvidePlugin({ React: "react" }),
    ...getHtmlPlugins(["popup"]),
  ].filter(Boolean),
};
