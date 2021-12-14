import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga  from './sagas';
import reducers from './reducers';

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
    )
);

sagaMiddleware.run(rootSaga)

export default store;