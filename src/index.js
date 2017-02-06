import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, hashHistory } from 'react-router'
import './index.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/:date" component={App} />
  </Router>
), document.getElementById('root'))
