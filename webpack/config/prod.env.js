const merge = require('webpack-merge');
// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const base = require('./base');
const helper = require('../helper');

const extractModulesCSS = new ExtractTextPlugin({filename: 'css/app.css'});
const extractGlobalCSS = new ExtractTextPlugin({filename: 'css/global-[name].css'});

const getConfig = (baseConfig, options) => {
    const webpackConfig = merge(baseConfig, {
        output: {
            libraryTarget: 'umd'
        },
        entry: {
            app: [helper.resolve('app/index.js')]
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
            // new UglifyJSPlugin({
            //     sourceMap: true
            // }),
            // new webpack.HashedModuleIdsPlugin(),
            extractModulesCSS,
            extractGlobalCSS
        ]
    });
    if (options.bundleAnalyzerReport) {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin({
            //  可以是`server`，`static`或`disabled`。
            //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
            //  在“静态”模式下，会生成带有报告的单个HTML文件。
            //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
            analyzerMode: 'static',
            //  将在“服务器”模式下使用的主机启动HTTP服务器。
            analyzerHost: '127.0.0.1',
            //  将在“服务器”模式下使用的端口启动HTTP服务器。
            analyzerPort: 8083,
            //  路径捆绑，将在`static`模式下生成的报告文件。
            //  相对于捆绑输出目录。
            reportFilename: 'report.html',
            //  模块大小默认显示在报告中。
            //  应该是`stat`，`parsed`或者`gzip`中的一个。
            //  有关更多信息，请参见“定义”一节。
            defaultSizes: 'parsed',
            //  在默认浏览器中自动打开报告
            openAnalyzer: true,
            //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
            generateStatsFile: false,
            //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
            //  相对于捆绑输出目录。
            statsFilename: 'stats.json',
            //  stats.toJson（）方法的选项。
            //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
            //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            logLevel: 'info'
        }));
    }
    return webpackConfig;
};

module.exports = (options) => {
    const baseConfig = base.getBaseConfig(options);
    console.log("==============", options.env, "===============");
    return getConfig(baseConfig, options);
};
