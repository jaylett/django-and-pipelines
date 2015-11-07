var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,

    entry: './app/entry.js',

    output: {
        path: path.resolve('./webpack/build'),
        filename: '[name].[hash].js',
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.coffee$/, loader: 'coffee-loader' },
        ],
    },
};