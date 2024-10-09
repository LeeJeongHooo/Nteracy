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
  entry: {
    popup: path.resolve("./src/popup/Popup.tsx"),
    background: path.resolve("./src/background/background.ts"),
    contentScript: path.resolve("./src/contentScript/index.tsx"),
  },
  output: {
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        use: ["postcss-loader"],
        test: /\.css$/i,
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)i$/,
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
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "contentScript";
      },
    },
  },
};
