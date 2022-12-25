import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { bookingsReducer } from './bookings';

const appReducer = combineReducers({
    bookings: bookingsReducer,
});

const middlewares = applyMiddleware(thunkMiddleware);

const store = createStore(appReducer, middlewares);

export default store;
