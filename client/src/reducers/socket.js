import socketIOClient from 'socket.io-client';

export default (state = socketIOClient('/'), {type}) => {
  switch(type) {
    default: 
      return state;
  }
};