const path = require('path');

exports.resolve = (dir) => path.join(__dirname, '../..', dir);

exports.htmlPluginOptions = ({env = 'development'}) => {
    const options = {
        // filename: 'index.html',
        template: exports.resolve('app/index.html'),
        showErrors: true,
        inject: false
        // apiPath: config.apiPath,
        // appVersion: config.version
    };

    if (env !== 'development') {
        // https://github.com/kangax/html-minifier#options-quick-reference
        options.minify = {
            minifyJS: true,
            removeComments: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true
        };
    }
    return options;
};
