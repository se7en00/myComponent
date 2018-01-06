import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'components/layout/App';
import 'scss/global.scss';

const mountNode = document.getElementById('root');
const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        mountNode,
    );
};

render(App);
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('components/layout/App', (err) => {
        console.log('module hot');
        if (err) {
            console.log(`in err : ${err}`);
        }
        const NextComponent = require('./components/layout/App.js').default;// eslint-disable-line
        render(NextComponent);
    });
}
