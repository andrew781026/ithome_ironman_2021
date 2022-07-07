// actionType
const ADD_TODO = 'ADD_TODO';

// action
function addTodo(text) {
  return {
    type: ADD_TODO, text
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
        todos: [...state.todos, action.text]
      }
    default:
      return state
  }
}

const {ref, createApp} = Vue;

const store = createStore(todoApp);

createApp({
  setup() {
    return {attrs: window.useReducer(store)}
  },
  methods: {
    addTodo(text) {
      store.dispatch(window.addTodo(text))
    }
  },
  template: `
    <div>
    <h1>Vue SFC with Redux</h1>
    <button @click="addTodo('more todos')">追加代辦事項</button>
    <p v-for="(todo,idx) in attrs.todos">🇿🇼 {{ idx }} - {{ todo }}</p>
    </div>
  `
}).mount('#root')

console.log('mounting;')
