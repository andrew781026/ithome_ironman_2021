function _uuid() {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// the createStore , no middleware , no multi reducer , has subscribe / unsubscribe
function createStore(reducer) {
  // get the initState from reducer
  let state = reducer(undefined, {});
  let listeners = {};
  return {
    getState: () => state,
    dispatch: function (action) {
      // middleware
      state = reducer(state, action);
      Object.values(listeners).forEach(l => l());
    },
    subscribe: listener => {
      const uuid = _uuid();
      listeners[uuid] = listener;
      return () => {
        if (listeners[uuid]) delete listeners[uuid];
      }
    }
  }
}
