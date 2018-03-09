const merge = require('webpack-merge');
const webpack = require('webpack');
const eslintPettyFormat = require('eslint-formatter-pretty');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const base = require('./base');
const helper = require('../helper');

const extractModulesCSS = new ExtractTextPlugin({filename: 'css/app.css'});
const extractGlobalCSS = new ExtractTextPlugin({filename: 'css/global-[name].css'});

module.exports = (options) => {
    const {autoOpenBrowser, host, port, contentBase, devtool} = options;
    const baseConfig = base.getBaseConfig(options);
    return merge(baseConfig, {
        devtool,
        entry: {
            app: [
                'react-hot-loader/patch',
                'webpack/hot/only-dev-server',
                helper.resolve('app/index.js')],
            vendor: [
                'classnames',
                'core-decorators',
                'moment',
                'react',
                'react-dom',
                'react-router',
                'react-css-modules',
                'react-css-themr',
                'react-router-dom',
                'react-transition-group',
                'prop-types',
                'ramda',
                'uuid']
        },
        module: {
            rules: [
                /**
                 * ESLINT-LOADER
                 */
                {
                    test: /\.js[x]?$/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    include: /app/,
                    use: [
                        {
                            loader: 'eslint-loader',
                            options: {
                                formatter: eslintPettyFormat
                            }
                        }]
                },
                /**
                 *  global styles
                 */
                {
                    test: /.*global\.(scss|css)$/,
                    use: extractGlobalCSS.extract({
                        use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2
                            }
                        }, {
                            loader: 'sass-loader'
                            //                        options: {
                            //                            includePaths: [
                            //                                path.resolve('./node_modules/font-awesome/scss/font-awesome.scss')]
                            //                        }
                        }],
                        fallback: 'style-loader'
                    })
                },
                /**
                 *  components styles for css-modules
                 */
                {
                    test: /^((?!global).)*(scss|css)$/,
                    exclude: /node_modules/,
                    use: ['css-hot-loader'].concat(extractModulesCSS.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 2,
                                localIdentName: '[local]_[hash:base64:5]',
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }]
                    }))
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.HashedModuleIdsPlugin(),

            extractModulesCSS,
            extractGlobalCSS
        ],
        devServer: {
            clientLogLevel: 'warning',
            historyApiFallback: true,
            hot: true,
            inline: true,
            contentBase: helper.resolve(contentBase),
            host,
            port,
            open: autoOpenBrowser
        }
    });
};
