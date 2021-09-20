import React from 'react';
import ReactWebComponent from 'react-web-component';
import './index.css';

class App extends React.Component {

  state = {n: 10}

  render() {
    return <div className="box">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="number">10</div>
      <div className="niddle"></div>
    </div>;
  }
}

ReactWebComponent.create(<App />, 'my-component');
