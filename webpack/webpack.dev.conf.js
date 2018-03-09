const devConfig = require('./config/dev.env');

module.exports = devConfig({
    env: 'development',
    assetsDirectory: 'build',
    assetsPublicPath: '/',
    host: 'localhost',
    port: 8083,
    autoOpenBrowser: false,
    devtool: 'cheap-module-eval-source-map',
    cssSourceMap: true,
    contentBase: 'app'
});

