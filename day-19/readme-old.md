# [Day19] - 串接 React Component 與 Web Component 的 DATA

利用 Redux 作用

-----
make a proxy as redux store ( no middleware )

custom it , to make it as redux store

```js
const createStore = (reducer /*, middleware */) => {

  const state = {};

  const store = {
    getState: () => state,
    dispatch: action => reducer(state, action)
  };

  return store;
}

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
console.log(store.getState())

// Dispatch 一些 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))

console.log(store.getState())

store.dispatch(addTodo('Learn about store'))

console.log(store.getState())
```

```javascript
const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToHome: () => dispatch(push('/')),
  };
};

// the using of react , use the HOC 
// make the connect function as a HOC
connect(mapStateToProps, mapDispatchToProps)(Component);
```


- [qinjunyi/myRedux](https://github.com/qinjunyi/MyRedux)
- [lipeiwei-szu/myRedux](https://github.com/lipeiwei-szu/MyRedux)
- [reduxjs/redux - v3.0](https://github.com/reduxjs/redux/blob/v3.0.0/src/createStore.js)
