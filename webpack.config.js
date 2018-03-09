const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintPettyFormat = require('eslint-formatter-pretty');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractModulesCSS = new ExtractTextPlugin({filename: 'css/app.css'});
const extractGlobalCSS = new ExtractTextPlugin({filename: 'css/global-[name].css'});
module.exports = {
    // devtool: 'cheap-module-source-map',
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: './app',
        port: 8083
    },
    entry: {
        app: [
            'react-hot-loader/patch',
            // 'webpack-dev-server/client?http://localhost:8083', // this is same as options:inline in the devServer
            /**
            /* only-dev-serve: doesn't reload the browser upon syntax errors. This is recommended for React apps because it keeps the state.
            /* dev-server: tries HMR (default). If there is any issue, it reloads the entire browser.
            **/
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'app/index.js')],
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
    output: {
        path: path.resolve(__dirname, 'build'),
        // publicPath: '/',
        filename: 'js/[name].bundle.js'
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
             * use babel to compile js or jsx file
             */
            {
                test: /\.js[x]?$/,
                include: path.resolve(__dirname, 'app'),
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader'},
                    {loader: 'eslint-loader'}
                ]
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
            },
            /**
             * Fonts/Images
             */
            {
                test: /\.(png|gif|bmp|jpg)([?#][a-zA-Z0-9#?&=.]*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            /**
             *  Fonts Awesome
             */
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }]
            },
            {
                test: /.(ttf|otf|eot|svg|woff|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        limit: 10000,
                        outputPath: 'fonts/', // where the fonts will go
                        publicPath: '../' // override the default path
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        modules: [path.resolve(__dirname, 'app'), 'node_modules'],
        alias: {
            SCSS_PATH: path.resolve(__dirname, 'app/scss')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            minChunks: Infinity
        }),
        new webpack.HashedModuleIdsPlugin(),
        extractModulesCSS,
        extractGlobalCSS,
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            // filename: 'index-[hash].html',
            title: 'myComponents boilerplate',
            showErrors: true,
            inject: false
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8083'
        })
    ]
};
