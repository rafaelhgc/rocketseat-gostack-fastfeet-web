import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import Deliverymen from '../pages/Deliverymen';
import DeliverymenForm from '../pages/DeliverymenForm';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={SignIn} exact />
      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/deliverymen/new" component={DeliverymenForm} isPrivate />
      <Route
        path="/deliverymen/:deliverymanId"
        component={DeliverymenForm}
        isPrivate
      />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
