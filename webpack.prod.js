const path = require("path");
const fs = require("fs");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const updateManifest = () => {
  const manifestPath = path.resolve(__dirname, "src/static/manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  manifest.content_scripts = [
    { matches: ["https://www.youtube.com/*"], js: ["content.js"] },
  ];

  const distManifestPath = path.resolve(__dirname, "dist/manifest.json");
  fs.writeFileSync(distManifestPath, JSON.stringify(manifest, null, 2));
};

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        use: {
          loader: "ts-loader",
        },
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("UpdateManifestPlugin", updateManifest);
      },
    },
  ],
});
