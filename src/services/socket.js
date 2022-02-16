import io from 'socket.io-client';
import { assert } from 'helpers/utils';

let socket = null;

export function init({ authToken }) {
  const options = {
    extraHeaders: {
      'Authorization': `Bearer ${authToken}`
    }
  };
  socket = io.connect('https://api-nonproduction.muso.ai/', {
    transportOptions: {
      websocket: options,
      polling: options
    }
  });
}

export function destroy() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getInstance() {
  assert(socket, 'Initialize socket service before use it');
  return socket;
}

export function componentOn(vm) {
  return (eventName, cb) => {
    assert(socket, 'Initialize socket service before use it');
    vm.$on('hook:beforeDestroy', () => {
      if (socket) {
        socket.off(eventName, cb)
      }
    });
    return socket.on(eventName, cb);
  }
}
