/* 
    ./webpack.config.js
*/
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin'); //for copying static files to public


// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//     template: './client/index.html',
//     filename: 'index.html', //the name of the HTML that the plugin will generate
//     inject: 'body' //add any JavaScript into the bottom of the page, just before the closing body tag
// })

module.exports = {
    context: __dirname,
    entry: './src/app/index.js',
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "react"],
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            "window.Tether": 'tether',
            Tether: 'tether'
        }),
        new CopyWebpackPlugin([
            { context: 'src/app/css/', from: '*.css', to: 'css/' },
            { context: 'src/app/js/', from: '*.js', to: 'js/' },
            { from: 'src/app/index.html', to: 'index.html' }
        ])
    ]
}