import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function serviceAction(state = initialState.serviceAction, action) {
  switch (action.type) {
    case types.APPBAR_ACTION:
      return action.serviceAction;
    default:
      return state;
  }
}

export function appBarToggle(state = initialState.drawer, action) {
  switch (action.type) {
    case types.DRAWER_TOGGLE:
      // console.log(state);
      return !state;
    default:
      return state;
  }
}

export function userLoggedToggle(state = initialState.logged, action) {
  switch (action.type) {
    case types.CLIENT_MENU:
      return !state;
    default:
      return state;
  }
}

export function pageTitle(state = initialState.pageTitle, action = {}) {
  switch (action.type) {
    case types.UPDATE_PAGE_TITLE:
      return action.pageTitle;
    default:
      return state;
  }
}
