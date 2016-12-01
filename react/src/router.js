import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import AppLayout from '../layouts/AppLayout';

import ProjectMethods from '../components/ProjectMethods';

export default (
  <Router history={browserHistory}>
    <Route>
      <Route path="/" component={AppLayout} />
      <IndexRoute component={ProjectMethods} />
    </Route>
  </Router>
);
