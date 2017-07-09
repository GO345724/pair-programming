import React from 'react';
import { Route, Switch } from 'react-router';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import NoMatch from '../components/common/NoMatch';

import HomePage from '../components/HomePage';
import Room from '../components/Room';

export default (
  <div>
    <Header />
    <div className="container">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/rooms/:id" component={Room} />
        <Route component={NoMatch} />
      </Switch>
    </div>
    <Footer />
  </div>
);
