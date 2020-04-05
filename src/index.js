import React from 'react';
import { render } from "react-dom";
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./js/store/index";
import App from './App';
import Contact from './contact';
import NotFound from './notfound';

import * as serviceWorker from './serviceWorker';
import './index.css';

window.store = store;

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/contact" component={Contact} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

render(
    <Provider store={store}>
        {routing}
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
