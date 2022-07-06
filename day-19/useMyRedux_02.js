// actionType
const ADD_TODO = 'ADD_TODO';

// action
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

// reducer
const initialState = {
  todos: []
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {text: action.text}
        ]
      }
    default:
      return state
  }
}

const middleware = store => next => action => {
  /* Code */
  return next(action);
}

// const enhancer = applyMiddleware(middleware);

const store = createStore(todoApp);

const unsubscribe = store.subscribe(() => console.log( 'logState in listener ,', store.getState()));

// 記錄初始 state
console.log('initState=', store.getState())

// Dispatch 一些 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))

unsubscribe()

store.dispatch(addTodo('喝水'))
store.dispatch(addTodo('吃飯'))

// react-redux
// vue-redux
// webcomponent-redux
