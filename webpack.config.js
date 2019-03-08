const webpack = require("webpack");
const CleanObsoleteChunks = require("webpack-clean-obsolete-chunks");

var path = require("path");
const ENV = "production";
const isProd = true;
const VERSION = JSON.stringify(require("./package.json").version).replace(
  /["']/g,
  ""
);
const publicPath = path.join(__dirname, "./package.json");
const shouldUseRelativeAssetPaths = publicPath === "./";

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
// const extractTextPluginOptions = shouldUseRelativeAssetPaths
//   ? // Making sure that the publicPath goes back to to build folder.
//     { publicPath: Array(cssFilename.split('/').length).join('../') }
//   : {};

const plugins = [
  new CleanObsoleteChunks(),
  new webpack.HotModuleReplacementPlugin()
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      quiet: true
    })
  );
  plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    })
  );
}

module.exports = env => {
  console.log(
    `|******************* NODE_ENV: ${ENV.toUpperCase()} #### VERSION: ${VERSION} ***********************************|`
  );

  return {
    mode: "production",
    entry: "./src/index.js",
    output: {
      filename: "index.js",
      path: path.join(__dirname, "build/")
      // publicPath: '/synbase',
    },
    devtool: "inline-source-map",
    resolve: {
      alias: {
        react: path.resolve("./node_modules/react")
      }
    },
    module: {
      rules: [
        {
          test: /\.js$|\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"]
            }
          }
        }
      ]
    },
    plugins: plugins,
    optimization: {
      minimize: isProd,
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      }
    }
  };
};
