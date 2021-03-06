import { RECEIVE_CURRENT_USER } from '../actions/session';
import { CLEAR_ERRORS, RECEIVE_ERRORS } from '../actions/error';

export default (state = "", {message, type}) => {
  switch(type) {
    case RECEIVE_ERRORS:
      return message;
    case RECEIVE_CURRENT_USER:
      return "";
    case CLEAR_ERRORS:
      return "";
    default: 
      return state;
  }
};