import React from 'react';
import { HashRouter } from 'react-router-dom';
import {SIDE_BAR_DATA} from 'constants/SidebarTree';
import { hot } from 'react-hot-loader';
import Main from './Main';
import SideBar from './sideBar/SideBar';
import AppStyle from './App.scss';

const App = () => (
    <HashRouter>
        <div className={AppStyle.container}>
            <SideBar menuData={SIDE_BAR_DATA}/>
            <Main/>
        </div>
    </HashRouter>
);

export default hot(module)(App);
