const prodConfig = require('./config/prod.env');

module.exports = prodConfig({
    env: 'production',
    assetsDirectory: 'build',
    assetsPublicPath: '/',
    host: 'localhost',
    port: 8083,
    autoOpenBrowser: false,
    devtool: 'source-map',
    cssSourceMap: true,
    contentBase: 'app'
});
