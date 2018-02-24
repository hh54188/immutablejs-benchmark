const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const PUBLIC_DIR_PATH = path.join(__dirname, "public");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: PUBLIC_DIR_PATH,
    historyApiFallback: true,
    open: true,
    // openPage: '/',
    hot: true,
    // proxy: {
    //   '/api': 'http://localhost:3000',
    // },
    overlay: {
      error: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index-template.html")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
  watch: true
});
