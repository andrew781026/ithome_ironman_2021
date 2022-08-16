// actionType
const ADD_TODO = 'ADD_TODO';

// action
const boundAddTodo = (text) => dispatch(addTodo(text))
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

const store = createStore(todoApp);

// 記錄初始 state
console.log('initState=',store.getState())

// Dispatch 一些 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))

console.log(store.getState())

store.dispatch(addTodo('Learn about store'))

console.log(store.getState())
