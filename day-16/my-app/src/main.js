
import Vue from 'vue';
import App from './App.vue';

// you can also ignore these tags by using regex instead of using strings:
// Vue.config.ignoredElements = [/gcse:*/]
Vue.config.ignoredElements = [
  'word-count'
]

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
});
