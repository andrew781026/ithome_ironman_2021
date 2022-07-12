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
  todos: ['去爬山']
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

// view component
const view = {
  template: `
    <div>
      <h1>Vue SFC with Redux</h1>
      <button @click="dispatch.addTodo('more todos')">追加代辦事項</button>
      <p v-for="(todo,idx) in attrs.todos">🇿🇼 第 {{ idx }} 個待辦事項 - {{ todo }} </p>
    </div>
  `,
  props: ["attrs", "dispatch"],
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: () => dispatch(addTodo('New Todo'))
  };
};

// container component
const hoc = connector(store)(mapStateToProps, mapDispatchToProps)(view);

const app = createApp({
  // components: [hoc],
  template: `
    <div id="app">
      <hoc />
    </div>
  `
});

// 將過去的 Vue.component 改為 app.component , 將元件註冊在 app 身上
app.component('hoc', hoc);

app.mount('#root');
