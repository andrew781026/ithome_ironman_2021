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
          action.text
        ]
      }
    default:
      return state
  }
}

const store = createStore(todoApp);

function MyApp(props) {
  const {todos, addTodo} = props;
  return <>
    <button onClick={addTodo}>增加 TODO</button>
    <ul>{todos.map((text, i) => <li key={i}>{text}_{i}</li>)}</ul>
  </>;
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

const Todo = connect(store)(mapStateToProps, mapDispatchToProps)(MyApp);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Todo/>);

// init 時 , subscribe
// destroy 時 , unsubscribe
