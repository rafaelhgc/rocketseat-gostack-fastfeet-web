import { persistStore } from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

import persistedReducers from './persistReducers';

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSagas from './modules/rootSagas';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistedReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

export { store, persistor };
