const
    fs = require('fs'),
    // webpack = require('webpack'),
    path = require('path'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    // CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
    // TerserPlugin = require('terser-webpack-plugin'),
    // ImageminWebpack = require('image-minimizer-webpack-plugin'),
    // SpritePlugin = require('svg-sprite-loader/plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin')
    CopyPlugin = require("copy-webpack-plugin");

let config = {
    context: path.resolve(__dirname, 'frontend'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: false,
            dangerouslyAllowCleanPatternsOutsideProject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: "./fonts", to: "../fonts" },
        //         { from: "./images", to: "../images" },
        //         { from: "../backend_kit", to: "../../api" },
        //     ]
        // }),

    ],
    module: {
        rules: [
            {
                test: /\.twig$/,
                use: ["twig-loader"],
            },
            {
                test: /\.html$/,
                type: 'asset/source'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true, url: false}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true, url: false}},
                ]
            }
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-sprite-loader',
            //     options: {
            //         extract: true,
            //         publicPath: '/public/images/flags/',
            //     }
            // }
        ]
    },
    // myPath: {
    //     html: {
    //         entry: [path.resolve(__dirname, './frontend/twig')],
    //         resolve: path.resolve(__dirname, 'frontend/twig/**/'),
    //     },
    //     dist: path.resolve(__dirname, './dist/'),
    // }
};

const generateHtmlPlugins = (templateDir) => {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles
        .filter((item) => item.split('.')[0][0] !== '_')
        .map((item) => {
            const parts = item.split('.');
            const name = parts[0];
            const extension = parts[1];
            return new HtmlWebpackPlugin({
                filename: `${path.resolve(__dirname, './dist/')}/${name}.html`,
                template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
                inject: false,
            });
        });
}

const htmlPlugins = (() => {
    let results = [];
    [path.resolve(__dirname, './frontend/twig/pages')].forEach((item) => {
        results = results.concat(generateHtmlPlugins(item));
    });
    return results;
})();

config.plugins = config.plugins.concat(htmlPlugins);
config.plugins.push(
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: {baseDir: path.resolve(__dirname, './dist/')},
        open: false,
    })
);

module.exports = config;