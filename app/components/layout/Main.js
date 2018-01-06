import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AccordionDemo from 'components/accordion/demo/AccordionDemo';
import Home from './Home';
import Bubble from '../bubble/Bubble';
import mainContentStyle from './Main.scss';

const Main = () => (
    <main className={mainContentStyle.mainContent}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/bubble" component={Bubble}/>
            <Route path="/accordion" component={AccordionDemo}/>
        </Switch>
    </main>
);

export default Main;
