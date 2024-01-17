const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common");

module.exports = (env, argv) => merge(
    common,
    {
        mode: "production",
        devtool: "source-map",
        optimization: {
            ...argv.optimization,
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
            ],
        },
    },
);
