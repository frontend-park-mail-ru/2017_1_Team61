import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Route} from 'react-router';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';

import reducers from './reducers';
import MainPage from './components/MainPage/MainPage';


const history = createHistory();

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    applyMiddleware(routerMiddleware(history))
);


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={MainPage}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
