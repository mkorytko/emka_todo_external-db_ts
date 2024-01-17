require("dotenv").config();
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {
    DIST_DIR, PUBLIC_PATH, WEBPACK_SRC: SRC, NODE_ENV,
} = process.env;

module.exports = {
    context: path.resolve(__dirname, SRC),
    entry: {
        app: {
            import: "./index.tsx",
            dependOn: "reactVendors",
        },
        reactVendors: ["react", "react-dom", "prop-types"],
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "../", DIST_DIR),
        publicPath: PUBLIC_PATH,
        clean: true,
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    maxSize: 200000,
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    performance: {
        hints: false,
        maxAssetSize: 200000,
        maxEntrypointSize: 250000,
        assetFilter(assetFilename) {
            return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "em!ka_todo",
            template: "template.html",
            filename: "index.html",
            favicon: "assets/img/favicon.ico",
            minify: false,
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: "babel-loader",
                exclude: /(node_modules)/,
            },
            {
                test: /\.tsx?$/i,
                use: "ts-loader",
                exclude: /(node_modules)/,
            },
            {
                test: /\.s?css$/i,
                use: [
                    {
                        loader: NODE_ENV !== "production"
                            ? "style-loader"
                            : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                    {
                        loader: "sass-resources-loader",
                        options: {
                            sourceMap: true,
                            resources: [
                                path.resolve(__dirname, SRC, "scss/vars.scss"),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|otf|ttf|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[hash][ext][query]",
                },
            },
            {
                test: /\.(jpe?g|png|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "images/[name].[hash][ext]",
                },
            },
        ],
    },
};
