import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { rootReducer } from './store/reducers/reducers';
// import {loginFlowSaga} from './store/sagasLoginFlow';
import {forkSaga} from './store/sagasFork';
import {takeSaga} from './store/sagasTakes';
import {eventChannelSaga} from "./store/sagaEventChannel";

const sagaMiddleware = createSagaMiddleware();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));


// sagaMiddleware.run(forkSaga)
// sagaMiddleware.run(loginFlowSaga)
// sagaMiddleware.run(rootSaga)
sagaMiddleware.run(eventChannelSaga)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
