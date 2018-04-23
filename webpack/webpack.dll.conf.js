const path = require('path');
const webpack = require('webpack');
const helper = require('./helper');
const vendor = require('./config/lib.dependencies');

module.exports = (env, argv) => {
    const __PRODUCTION__ = env.production === true;
    console.log(`当前运行环境： ${__PRODUCTION__ ? 'production' : 'development'}`);
    const DEV_LIB_PATH = helper.resolve('build/lib/dev');
    const PROD_LIB_PATH = helper.resolve('build/lib/product');
    const outputPath = __PRODUCTION__ ? PROD_LIB_PATH : DEV_LIB_PATH;

    return {
        devtool: '#source-map',
        entry: {vendor},
        output: {
            path: outputPath,
            filename: '[name].dll.js',
            library: '[name]_[hash]_library'
        },
        plugins: [
            new webpack.DllPlugin({
                /**
                 * path
                 * 定义 manifest 文件生成的位置
                 * [name]的部分由entry的名字替换
                 */
                path: path.join(outputPath, '[name]-manifest.json'),
                /**
                 * name
                 * dll bundle 输出到那个全局变量上
                 * 和 output.library 一样即可。
                 */
                name: '[name]_[hash]_library',
                /**
                 * 指定一个路径作为上下文环境，作为manifest中的请求上下文
                 * 需要与DllReferencePlugin的context参数保持一致，
                 * 建议统一设置为项目根目录
                 */
                context: helper.defPath.ROOT_PATH
            })
        ]
    };
};
