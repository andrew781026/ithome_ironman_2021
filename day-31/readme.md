### 製作 Web Component 可用的相關套件

- [Stencil JS](https://blog.techbridge.cc/2020/03/30/stencil-claps-web-component/) - 專門製作 Web Component 的 JS 工具
- [7 Tools for Building Web Components](https://blog.bitsrc.io/7-tools-for-developing-web-components-in-2019-1d5b7360654d)

### 7 個套件大 PK

1. [Stencil JS](https://stenciljs.com/docs/introduction)

由 ionic 團隊製作的套件 , 利用 @ 設定參數

```jsx
import { Component } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css'
})
export class TodoList {
   render() {
     return (
       <div>
         {this.todos.map((todo) =>
           <div>
             <div>{todo.taskName}</div>
             <div>{todo.isCompleted}</div>
           </div>
         )}
       </div>
     )
   }
}
```

2. [LitElement](https://lit-element.polymer-project.org/guide/templates)

由 ionic 團隊製作的套件 , 利用 @ 設定參數

### 9 個 Web-Component

- [9 Web Components UI Libraries You Should Know in 2021](https://blog.bitsrc.io/9-web-component-ui-libraries-you-should-know-in-2019-9d4476c3f103)
