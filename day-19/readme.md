# [Day19] - 仿造 Redux 建立 MyRedux 

目前我們有三種類型的元件， React 元件 / Vue 元件 / Web Component

React 元件中可以儲存自身的資料，但是他要如何將資料傳到 Vue 元件中呢？

在 React 中有一個東西叫做 Redux，他可以將資料存到自身當中，要用的時候才跟他拿

也許有人會覺得奇怪，如果只是要放資料，那將資料放到 windows 上需要的時候再拿就好，何必要用到 Redux 呢？

這牽涉到我們需要有個某個資料的監聽機制，當資料變動時， react 跟 vue 都可以知道資料已經改變

這時我們就可以利用 Redux 來製作這樣的東東

---

下面我們來說明 Redux 要如何使用，來讓 React 跟 Vue 監聽到資料有變動，它需要 reRender



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
