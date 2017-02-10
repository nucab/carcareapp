// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as appBarReducers from './appBarReducer';
import flashMessages from './flashMessages';
import listingsReducer from './locationReducer';
import services from './serviceReducer';


const rootReducer = combineReducers({
  serviceAction: appBarReducers.serviceAction,
  services,
  flashMessages,
  drawer: appBarReducers.appBarToggle,
  logged: appBarReducers.userLoggedToggle,
  listingsReducer,
  routing: routerReducer,
  pageTitle: appBarReducers.pageTitle
});

export default rootReducer;
