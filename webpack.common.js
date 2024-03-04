const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

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
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        test: /\.css$/i,
      },
      {
        type: "asset/resource",
        use: ["file-loader"],
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)i$/,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4000,
              fallback: "file-loader",
              name: "images/[name].[ext]",
            },
          },
        ],
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
  output: {
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "contentScript";
      },
    },
  },
};
