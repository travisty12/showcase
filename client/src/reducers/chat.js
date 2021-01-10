import { TOGGLE_CHAT } from '../actions/chat';

export default (state = true, {type}) => {
  switch(type) {
    case TOGGLE_CHAT:
      return !state;
    default: 
      return state;
  }
};