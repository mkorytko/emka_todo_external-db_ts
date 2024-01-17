require("dotenv").config();
const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");

const {
    DEVELOPMENT_PORT, DIST_DIR, BACKEND_PORT,
} = process.env;

module.exports = merge(common, {
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, "../", DIST_DIR),
        proxy: {
            "/api": {
                target: `http://localhost:${BACKEND_PORT}`,
                secure: false,
                changeOrigin: true,
            },
        },
        open: !DEVELOPMENT_PORT,
        compress: true,
        hot: true,
        port: DEVELOPMENT_PORT,
    },
    target: "web",
    devtool: "inline-source-map",
});
