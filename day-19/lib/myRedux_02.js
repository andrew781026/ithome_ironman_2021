/**
 * the createStore , no middleware , no multi reducer , has subscribe / unsubscribe
 * @param reducer
 * @returns {{getState: (function(): *), dispatch: dispatch, subscribe: (function(*): function(): void)}}
 */
function createStore(reducer) {
  // get the initState from reducer
  let state = reducer(undefined, {});
  let listeners = [];
  return {
    getState: () => state,
    dispatch: function (action) {
      // middleware
      state = reducer(state, action);
      listeners.forEach(l => l());
    },
    subscribe: listener => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1); // remove the listener
      }
    }
  }
}
