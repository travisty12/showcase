import { combineReducers } from 'redux';
import errors from './errors'
import session from './session'
import socket from './socket'

export default combineReducers({
  session,
  errors,
  socket
})