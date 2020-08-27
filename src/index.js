import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'

import './styles/app.scss';

const store = configureStore()
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
<Provider store={store}>
    <div className='app'> 
    	<BrowserRouter>
        	<App store={store} />
        </BrowserRouter>
    </div>    
</Provider>    
, document.getElementById('app')
);