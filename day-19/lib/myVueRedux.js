(() => {
  const {ref, onMounted, onBeforeUnmount} = Vue;

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
})()
