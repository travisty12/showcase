import { combineReducers } from 'redux';
import errors from './errors'
import session from './session'
import socket from './socket'
import chatOpen from './chat'

export default combineReducers({
  session,
  errors,
  socket,
  chatOpen
})