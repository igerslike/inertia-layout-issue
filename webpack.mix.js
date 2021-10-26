/* global require */

const mix = require('laravel-mix')

require('laravel-mix-merge-manifest')

mix.ts('resources/scripts/app.ts', 'public/js')
    .vue({ version: 3 })
    .postCss('resources/css/app.css', 'public/css', [require('postcss-import'), require('tailwindcss')])
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: { appendTsSuffixTo: [/\.vue$/] },
                    exclude: /node_modules/
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        refSugar: true
                    }
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx']
        }
    })
    .webpackConfig(require('./webpack.config'))
    .version()
    .mergeManifest()
    .extract()

if (mix.inProduction()) {
    mix.version()
}

if (!mix.inProduction()) {
    mix.options({
        hmrOptions: {
            host: 'app.loc', // site's host name
            port: 8080,
            https: {
                key: '/usr/local/etc/httpd/certs/app.loc-key.pem',
                cert: '/usr/local/etc/httpd/certs/app.loc.pem'
            }
        }
        // hmrOptions: {
        //     port: 8080,
        // }
    }).browserSync({
        open: false,
        host: 'app.loc',
        proxy: 'https://app.loc',
        https: {
            key: '/usr/local/etc/httpd/certs/app.loc-key.pem',
            cert: '/usr/local/etc/httpd/certs/app.loc.pem'
        }
    })
    // .browserSync({
    //     open: true,
    // })
}
