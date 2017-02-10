import * as type from '../actions/actionTypes';
import shortid from 'shortid';

export default function(state = [], action = {}) {
  switch(action.type) {
    case type.ADD_FLASH_MESSAGE: {
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    }
    default: return state;
  }
}
