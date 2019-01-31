import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';


const store=createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>

, document.getElementById('root'));
