(() => {
  const {h, ref, onMounted, onBeforeUnmount} = Vue;

  const connector = store => (mapStateToProps, mapDispatchToProps) => Component => {

    return {
      mounted() {
        this.listener = store.subscribe(() => {
          this.attrs = mapStateToProps(store.getState())
        });
      },
      beforeUnmount() {
        this.listener(); // unsubscribe the listener
      },
      data() {
        return {
          attrs: mapStateToProps(store.getState()),
          dispatch: mapDispatchToProps(store.dispatch)
        };
      },
      render() {
        return h(Component, {
          attrs : this.attrs,
          dispatch: this.dispatch,
        });
      },
    }
  }

  const useReducer = store => {

    const props = ref({});
    let unsubscribe;

    onMounted(() => {
      unsubscribe = store.subscribe(() => props.value = store.getState());
    })

    onBeforeUnmount(() => unsubscribe())

    return props;
  }

  window.useReducer = useReducer;
  window.connector = connector;
})()
