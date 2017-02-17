import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function serviceReducer(state = initialState.services, action) {
  switch (action.type) {
    case types.LOAD_SERVICES_SUCCESS:
      // console.log(action);
      // action.services.map((service, key) => {
      //   service.replacementDate = service.replacementDate || dateFormat(service.replacementDate);
      // });
      // console.log(action.services);
      return action.services;
    case types.LOAD_SERVICE_SUCCESS:
      return [
        ...state.filter(service => service.id !== action.service.id),
        Object.assign({}, action.service)
      ];
    case types.ADD_SERVICE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.service)
      ];
    case types.UPDATE_SERVICE_SUCCESS:
      // console.log(state);
      return [
        ...state.filter(service => service.id !== action.service.id),
        Object.assign({}, action.service)
      ];
    default:
      return state;
  }
}
