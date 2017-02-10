/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import 'babel-polyfill';
import routes from './routes';
import * as serviceActions from './actions/serviceActions';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico

import './assets/bootstrap/css/bootstrap.css';
import './assets/icons/flaticon.css';
import './stylesheets/helper-classes.scss';
// import './stylesheets/spinner.scss';
import './stylesheets/main.scss';
import './stylesheets/responsive.scss';

import { deepPurple100, deepPurple500, deepPurple700, pinkA100, pinkA200, pinkA400 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const store = configureStore();
// store.dispatch(serviceActions.loadServicesByTypeSuccess());

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple500,
    primary2Color: deepPurple700,
    primary3Color: deepPurple100,
    accent1Color: pinkA200,
    accent2Color: pinkA100,
    accent3Color: pinkA400,
  },
});

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={history} routes={routes}/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
