
import {createStore,  applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rowEventReducer } from './eventRowReducer';


export const ConfigureStore = () => {

    const store = createStore(rowEventReducer,  applyMiddleware(thunk, logger) );

    return store;
}
