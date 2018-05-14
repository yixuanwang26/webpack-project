import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { WelcomePage } from '../src/layout/WelcomePage';
import { FreePage } from '../src/layout/FreePage';
import { rootReducer } from './reducers';

import 'antd/dist/antd.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

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