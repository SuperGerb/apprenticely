/* 
    ./webpack.config.js
*/
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin'); //for copying static files to public

require('dotenv').config(); //propagate some env vars to profilic frontend.

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
    resolve: { symlinks: false },//stop faffing about with my linked projs!
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"],
                    //Required for transforming es2015 static class properties and as properties declared with the es2016 property initializer syntax. (required for interpreting es6 arrow functions):
                    plugins: ["transform-class-properties", "transform-decorators-legacy"]
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
        new webpack.EnvironmentPlugin([
          'NODE_ENV', 'HOST', 'PORT'
        ]),
        new CopyWebpackPlugin([
            { context: 'src/app/css/', from: '*.css', to: 'css/' },
            { context: 'src/app/js/', from: '*.js', to: 'js/' },
            { context: 'src/app/images/site/', from: '**/*', to: 'images/site/' },
            { context: 'src/app/css/font-awesome/css/', from: '*.min.css', to: 'css/font-awesome/css/'},
            { context: 'src/app/css/font-awesome/fonts/', from: '*.*', to: 'css/font-awesome/fonts/'},      
            { from: 'src/app/index.html', to: 'index.html' }
        ])
    ]
}

