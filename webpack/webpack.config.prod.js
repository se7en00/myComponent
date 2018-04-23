// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const getClientEnvironment = require('./config/env');
// const extractSassRules = require('./config/styleLoaders');
// const {resolve} = require('./config/resolve');
// const paths = require('./config/paths');
// const {entry} = require('./config/entry');
// const {output} = require('./config/output');
// const {eslintRules} = require('./config/eslintRules');
// const {babelLoader} = require('./config/babelLoader');
// const {imagesUrlLoader, fontsLoader, noMatchLoader} = require('./config/fileLoaders');
//
// // Webpack uses `publicPath` to determine where the app is being served from.
// // It requires a trailing slash, or the file assets will get an incorrect path.
// const publicPath = paths.servedPath;
// // `publicUrl` is just like `publicPath`, but we will provide it to our app
// // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// const publicUrl = publicPath.slice(0, -1);
// // Get environment variables to inject into our app.
// const env = getClientEnvironment(publicUrl);
// //style for css moudules
// const extractModulesCSS = new ExtractTextPlugin({filename: 'css/[name].css'});
// //global style
// const extractGlobalCSS = new ExtractTextPlugin({filename: 'css/global-[name].css'});
//
//
// module.exports = {
//     mode: 'production',
//     // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
//     // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
//     devtool: 'source-map',
//     entry: entry(paths),
//     output: output(paths),
//     resolve: resolve(paths, {SCSS_PATH: paths.appScss}),
// };
