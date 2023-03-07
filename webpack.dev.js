const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    open: true,
    host: "localhost",
    historyApiFallback: {
      disableDotRule: true,
    },
  },
});
