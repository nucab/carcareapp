import axios from 'axios';
import dateFormat from 'dateformat';

import * as types from './actionTypes';

export function addService(serviceData) {
  return dispatch => {
    return axios.post('/api/services', serviceData).then(({data}) => {
      // console.log(data);
      dispatch(addServiceSuccess(data));
    });
  };
}

export function addServiceSuccess(service) {
  return {
    type: types.ADD_SERVICE_SUCCESS,
    service
  };
}

export function updateService(service) {
  service = Object.assign({}, service); // to avoid manipulating object passed in.
  // console.log(service);
  return dispatch => {
    // console.log(service);
    return axios.put(`/api/services/${service.id}`, service).then(({data}) => {


      // console.log(data);
      dispatch(updateServiceSuccess(data));
    }).catch(err => {
      throw err;
    });
  };
}

export function updateServiceSuccess(service) {
  return {
    type: types.UPDATE_SERVICE_SUCCESS,
    service
  };
}

export function loadServicesByType(serviceType = 'engine') {
  return dispatch => {
    return axios.get(`/api/services/${serviceType}`).then(({data}) => {
      data.map(service => {
        service.replacementDate = dateFormat(service.replacementDate, 'yyyy-mm-dd hh:MM:ss') || '';
      });
      dispatch(loadServicesSuccess(data));
    }).catch(err => {
      throw err;
    });
  };
}

export function loadServicesSuccess(services) {
  return {
    type: types.LOAD_SERVICES_SUCCESS,
    services
  };
}

export function loadServiceSuccess(service) {
  return {
    type: types.LOAD_SERVICE_SUCCESS,
    service
  };
}

export function loadService(serviceId) {
  return dispatch => {
    return axios.get('/api/services/service/' + serviceId).then(({data}) => {
      dispatch(loadServiceSuccess(data));
    }).catch(err => {
      throw err;
    });
  };
}
