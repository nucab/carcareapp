import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import ManageServicePage from './components/services/ManageServicePage';
import AddEntry from './components/services/AddEntry';
import EditEntry from './components/services/EditEntry';
import FuelPage from './components/fuel/FuelPage';
import TravelPage from './components/travel/TravelPage';
import CalculatePage from './components/calculate/CalculatePage';
import SettingsPage from './components/settings/SettingsPage';

import UserLoginPage from './components/user/UserLoginPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="calculate" component={CalculatePage} />
    <Route path="service" component={ManageServicePage} />
    <Route path="service/:serviceType/add" component={AddEntry} />
    <Route path="service/:serviceType/edit/:serviceId" component={EditEntry} />
    <Route path="service/:serviceType(/:id)" component={ManageServicePage} />
    <Route path="fuel" component={FuelPage} />
    <Route path="travel" component={TravelPage} />
    <Route path="settings" component={SettingsPage} />
    <Route path="login" component={UserLoginPage} />
  </Route>
);

