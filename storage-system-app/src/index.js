import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RegisterBlocks from './components/register-blocks';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" component={App} />
                <Route path="/specifyBlocks" component={RegisterBlocks} />
            </div>
        </Router>
    </Provider >, document.getElementById('root'));