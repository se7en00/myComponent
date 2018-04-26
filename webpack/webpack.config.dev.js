const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('./config/InterpolateHtmlPlugin');
const getClientEnvironment = require('./config/env');
const extractSassRules = require('./config/styleLoaders');
const {resolve} = require('./config/resolve');
const paths = require('./config/paths');
const {entry} = require('./config/entry');
const {output} = require('./config/output');
const {eslintRules} = require('./config/eslintRules');
const {babelLoader} = require('./config/babelLoader');
const {imagesUrlLoader, fontsLoader, noMatchLoader} = require('./config/fileLoaders');

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
//style for css moudules
const extractModulesCSS = new ExtractTextPlugin({filename: 'css/[name].css'});
//global style
const extractGlobalCSS = new ExtractTextPlugin({filename: 'css/global-[name].css'});

module.exports = {
    mode: 'development',
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: 'cheap-module-eval-source-map',
    entry: entry(paths),
    output: output(paths),
    resolve: resolve(paths, {SCSS_PATH: paths.appScss}),
    module: {
        strictExportPresence: true,
        rules: [
            // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
            // { parser: { requireEnsure: false } },
            eslintRules(paths),

            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list
                oneOf: [
                    babelLoader(paths),
                    extractSassRules(paths, extractGlobalCSS), //match global style
                    extractSassRules(paths, extractModulesCSS, true), //match moudules style
                    imagesUrlLoader(),
                    ...fontsLoader(),
                    noMatchLoader()
                ]
            }
        ]
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            showErrors: true,
            template: paths.appHtml
        }),
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin(env.raw),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
        new webpack.DefinePlugin(env.stringified),

        new webpack.HotModuleReplacementPlugin(),
        // skip the emitting phase whenever there are errors while compiling, this
        //won't reload page
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.HashedModuleIdsPlugin(),

        extractModulesCSS,
        extractGlobalCSS
    ],
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false
    }
};
