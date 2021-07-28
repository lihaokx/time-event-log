
import {createStore,  applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rowEventReducer } from './eventRowReducer';
import {dashBoardReducer} from './dashBoardReducer';
const expireReducer = require('redux-persist-expire');

const persistConfig = {
    key: 'root',
    storage: storage,
    // whitelist: [rowEventReducer]
    // transforms: [expireReducer('preference', {
    //      expireSeconds: 5555,
    //     }), [rowEventReducer, dashBoardReducer] ]
}

const persistedReducer = persistReducer( persistConfig, 
    combineReducers({
    rows: rowEventReducer, 
    dashBoard: dashBoardReducer
}))

export const ConfigureStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk, logger) )
    let persistor = persistStore(store)
    return { store, persistor }
}



// export const ConfigureStore = () => {
//     const store = createStore(
//         combineReducers({
//             rows: rowEventReducer, 
//             dashBoard: dashBoardReducer
//         }),        
//         applyMiddleware(thunk, logger) );
//     return store;
// }
