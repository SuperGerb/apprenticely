/* 
    ./webpack.config.js
*/
const path = require('path');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//     template: './client/index.html',
//     filename: 'index.html', //the name of the HTML that the plugin will generate
//     inject: 'body' //add any JavaScript into the bottom of the page, just before the closing body tag
// })

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.resolve('public/js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { 
                    presets: ["es2015","react"],
                }
            }
        ]
    }//,
    //plugins: [HtmlWebpackPluginConfig]
}

