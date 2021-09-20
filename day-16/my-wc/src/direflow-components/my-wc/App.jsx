import React from 'react';
import PropTypes from 'prop-types';
import {Styled} from 'direflow-component';
import styles from './App.css';

class App extends React.Component {

  state = {}

  componentDidMount() {

    this.setState({
      timer: this.props.timer,
      isMounted: true,
    })

    setInterval(() => this.setState(prevState => ({timer: prevState.timer - 1})), 1000)
  }

  render() {

    if (!this.state.isMounted) return ''
    else return (
      <Styled styles={styles}>
        <div className="box">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="number">{this.state.timer}</div>
          <div className="niddle"></div>
        </div>
      </Styled>
    );
  }
}

App.defaultProps = {timer: 10,}

App.propTypes = {
  timer: PropTypes.number,
};

export default App;
