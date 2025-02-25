const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@background": path.resolve(__dirname, "./src/background"),
      "@content": path.resolve(__dirname, "./src/content"),
      "@popup": path.resolve(__dirname, "./src/popup"),
    },
  },
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
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/i,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve("src/static"), to: path.resolve("dist") },
        {
          from: path.resolve("src/assets/images"),
          to: path.resolve("dist/"),
        },
      ],
    }),
    ...getHtmlPlugins(["popup"]),
  ],
};
