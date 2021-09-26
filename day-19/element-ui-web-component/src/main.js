import Vue from 'vue'

import wrap from '@vue/web-component-wrapper'
import myButton from './components/myButton';

const CustomElement = wrap(Vue, myButton)

window.customElements.define('el-button', CustomElement)
