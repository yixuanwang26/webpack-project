import { render } from 'react-dom';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { WelcomePage } from '../src/layout/WelcomePage';
import { FreePage } from '../src/layout/FreePage';
import 'antd/dist/antd.css';


render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/user"
        component={FreePage}
      /> 
      <Route
      path="/"
      render={props => <WelcomePage {...props}/>}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
);