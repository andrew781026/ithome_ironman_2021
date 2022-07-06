import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 只需要做全域 import , 之後你就可以使用定義的 custom element
import './word-count.js';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
