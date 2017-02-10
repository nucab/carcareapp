import * as types from '../actions/actionTypes';

export default function listingsReducer(state = [], action) {
  switch (action.type) {
    case types.LOCATION_CHANGE: {
      return state;
    }
    default:
      return state;
  }
}

