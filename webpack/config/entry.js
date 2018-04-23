const port = parseInt(process.env.PORT, 10) || 8083; //eslint-disable-line
const dev = (paths) => ({
    app: [
        // enable React HMR,react-hot-loader v4 recommended remove it from webpack config when we use hot,
        // not AppContainer component
        // 'react-hot-loader/patch',
        // this is same as options:inline in the devServer, but we need add it when use node api of dev server
        `webpack-dev-server/client?http://localhost:${port}`,
        /**
         /* only-dev-serve: doesn't reload the browser upon syntax errors. This is recommended for React apps because it keeps the state.
         /* dev-server: tries HMR (default). If there is any issue, it reloads the entire browser.
         **/
        'webpack/hot/only-dev-server',
        // Finally, this is your app's code:
        paths.appIndexJs
    ]
});


const prod = (paths) => ({
    app: [
        // In production, we only want to load the polyfills and the app code.
        // require.resolve('./polyfills'),
        paths.appIndexJs
    ]
});

const entry = (paths) => {
    if (process.env.NODE_ENV === 'production') {
        return prod();
    }
    return dev(paths);
};

module.exports = {
    entry,
    dev,
    prod
};
