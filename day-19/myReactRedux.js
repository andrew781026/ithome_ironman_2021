const connect = store => (mapStateToProps, mapDispatchToProps) => Component => {

  return class extends React.Component {

    listener = undefined;
    state = {
      store: mapStateToProps(store.getState()),
      dispatch: mapDispatchToProps(store.dispatch)
    };

    componentDidMount() {
      this.listener = store.subscribe(() => {
        this.setState({
          store: mapStateToProps(store.getState()),
        });
      });
    }

    componentWillUnmount() {
      this.listener(); // unsubscribe the listener
    }

    render() {
      const {store,dispatch} = this.state;
      return <Component {...store} {...dispatch} />
    }
  }
}
