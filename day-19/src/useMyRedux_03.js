// reducer
const initialState = {
  todos: []
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
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
