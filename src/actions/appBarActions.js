import * as types from './actionTypes';

export function drawerToggle(toggle) {
  return {
    type: types.DRAWER_TOGGLE,
    toggle
  };
}

export function clientMenuShow(toggle) {
  return {
    type: types.CLIENT_MENU,
    toggle
  };
}

export function updatePageTitle(pageTitle) {
  return {
    type: types.UPDATE_PAGE_TITLE,
    pageTitle
  };
}

export function updateNavIcon(button) {
  return {
    type: types.APPBAR_MENU_BUTTON,
    button
  };
}

export function updateNavAction(serviceAction) {
  return {
    type: types.APPBAR_ACTION,
    serviceAction
  };
}
