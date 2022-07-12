// the createStore , no middleware , no multi reducer , no subscribe / unsubscribe
const createStore = reducer => {

  // get the initState from reducer
  let state = reducer(undefined, {});

  return {
    getState: () => state,
    dispatch: action => state = reducer(state, action)
  };
}
