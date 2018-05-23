import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { WelcomePage } from '../src/layout/WelcomePage';
import { FreePage } from '../src/layout/FreePage';
import { rootReducer } from './reducers';
import rootSaga from './saga';

import 'antd/dist/antd.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/user"
          component={FreePage}
        />
        <Route
          path="/"
          render={props => {
            return <WelcomePage { ...props } />
          }
        }
        />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);