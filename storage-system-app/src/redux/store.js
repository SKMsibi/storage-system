import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const enhancers = []

const devToolsExtension = window.devToolsExtension

if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
}

const composedEnhancers = compose(
    applyMiddleware(thunk),
    ...enhancers
)
export default createStore(reducer, composedEnhancers);