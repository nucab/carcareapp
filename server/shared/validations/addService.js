import { isEmpty } from 'lodash';
import { empty } from 'locutus/php/var';

export default function validateInput(data) {
  let errors = {};

  if(empty(data.brandName)) {
    errors.brandName = 'This field is required'
  }

  if(empty(data.marking)) {
    errors.marking = 'This field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
