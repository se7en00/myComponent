const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const base = require('./base');
const helper = require('../helper');

const extractModulesCSS = new ExtractTextPlugin({filename: 'css/app.css'});
const extractGlobalCSS = new ExtractTextPlugin({filename: 'css/global-[name].css'});

module.exports = (options) => {
    const baseConfig = base.getBaseConfig(options);
    return merge(baseConfig, {
        entry: {
            app: [helper.resolve('app/index.js')],
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
                    use: extractModulesCSS.extract({
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
                    })
                }
            ]
        },
        plugins: [
            new webpack.HashedModuleIdsPlugin(),
            extractModulesCSS,
            extractGlobalCSS
        ]
    });
};
