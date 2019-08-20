'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const argv = process.argv;
const params = {
    env: argv[2],
    sourceMap: argv[2] === 'development' ? true : false, // 环境 development / production
    publicPath: argv[3] || '/'
}
if (params.env != '--inline') {
    console.log(
        ' 环境 : ' + params.env + '\n',
        '是否需要sourceMap : ' + params.sourceMap + '\n',
        '公共文件路径 : ' + params.publicPath + '\n');
}

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // 搜索接口
            "/songsearch": {
                target: "http://songsearch.kugou.com/song_search_v2",
                changeOrigin: true,
                pathRewrite: {
                    "^/songsearch": ""
                }
            },
            // 获取歌曲接口
            "/play": {
                target: "http://www.kugou.com/yy/index.php",
                changeOrigin: true,
                pathRewrite: {
                    "^/play": ""
                }
            },
            // 搜索框关键词搜索接口
            "/searchtip": {
                target: "http://searchtip.kugou.com/getSearchTip",
                changeOrigin: true,
                pathRewrite: {
                    "^/searchtip": ""
                }
            }
        },

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: false,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: params.publicPath,

        /**
         * Source Maps
         */

        productionSourceMap: params.sourceMap,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
