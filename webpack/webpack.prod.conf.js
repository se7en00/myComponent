const prodConfig = require('./config/prod.env');

module.exports = prodConfig({
    env: 'production',
    assetsDirectory: 'build',
    assetsPublicPath: '/assets/',
    host: 'localhost',
    port: 8083,
    autoOpenBrowser: false,
    devtool: 'source-map',
    cssSourceMap: true,
    contentBase: 'app',
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false
});
