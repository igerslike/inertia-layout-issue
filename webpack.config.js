/* global require */

const path = require('path')

const webpack = require('webpack')

/* global module */

module.exports = {
    output: {
        chunkFilename: 'js/[name].js?id=[chunkhash]'
    },
    resolve: {
        alias: {
            '@': path.resolve('resources/')
        }
    },
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        })
    ]
}
