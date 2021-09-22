# 2021 年度 IT 鐵人賽文章

這裡放置 Tree 在 2021 年度的 IT 鐵人賽文章資料收集 , 主題：Web Component

### Idea 收集

- 介紹 web

### 目錄 ?

- 介紹什麼是 Web Component ? (去年寶哥介紹)

可以利用 Web Component 製作某些 Component 

0. Typography - 文字定義
1. Label 
2. Checkbox 
3. Filter-Select 
4. Multi-Select 
5. Button - ripple / loading-cat 
6. Form - validator & error
7. Table - fixed / scrollable / expanded (  )
8. loader - circle / linear ( 等待畫面 )
9. progress - bar / circle ( 進度條 )
10. Dialog - 彈跳視窗
11. breadcrumb - 麵包屑 
12. Pagination - 頁碼 / 每頁 n 筆 / 共 n 頁 / 第一頁 . 最後一頁 / 上一頁 . 下一頁

### 製作 Web Component 可用的相關套件

- [Stencil JS](https://blog.techbridge.cc/2020/03/30/stencil-claps-web-component/) - 專門製作 Web Component 的 JS 工具
- [7 Tools for Building Web Components](https://blog.bitsrc.io/7-tools-for-developing-web-components-in-2019-1d5b7360654d)
- [vue-custom-element - 包裝 Vue 元件 , 將其轉換成 custom-element](https://github.com/karol-f/vue-custom-element)
- [css-doodle - 基於 Web Components 技術的元件](https://css-doodle.com/)
- [Virtual DOM | 為了瞭解原理，那就來實作一個簡易 Virtual DOM 吧！](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/build-a-simple-virtual-dom-5cf12ccf379f)


![vue-custom-element](https://github.com/karol-f/vue-custom-element/raw/master/demo/assets/images/vue-custom-element-schema.png)

### 相關影片

- [Web Components Crash Course](https://www.youtube.com/watch?v=PCWaFLy3VUo&t=940s)

### 許許多多的 JS

- [UmiJS](https://umijs.org/zh-CN/docs) - Umi 是蚂蚁金服的底层前端框架 for React 
- [DVaJs](https://dvajs.com/guide/#%E7%89%B9%E6%80%A7) - React 專用的數據處理工具
- [BetterScroll](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html#scrollx) - BetterScroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件
- [omi.js](https://github.com/Tencent/omi/tree/v6/packages/omi-30-seconds#font-face-doesnt-work-in-shadow-dom)

### 其他

- [OBS](https://obsproject.com/) - 線上直播工具 
- [carbon - 將程式碼轉換成圖片](https://carbon.now.sh/)

- [async-validator](https://github.com/yiminghe/async-validator) - element-UI 使用的驗證 JS

- [video.js - 線上撥放影片的 JS](https://videojs.com/getting-started)
- [hls.js - 線上撥放影片的 JS](https://videojs.com/getting-started)

```javascript
// in element-UI form-item.vue 
function validate(trigger, callback = _=>_) {
  this.validateDisabled = false;
  const rules = this.getFilteredRule(trigger);
  if ((!rules || rules.length === 0) && this.required === undefined) {
    callback();
    return true;
  }

  this.validateState = 'validating';

  const descriptor = {};
  if (rules && rules.length > 0) {
    rules.forEach(rule => {
      delete rule.trigger;
    });
  }
  descriptor[this.prop] = rules;

  const validator = new AsyncValidator(descriptor);
  const model = {};

  model[this.prop] = this.fieldValue;

  validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
    this.validateState = !errors ? 'success' : 'error';
    this.validateMessage = errors ? errors[0].message : '';

    callback(this.validateMessage, invalidFields);
    this.elForm && this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
  });
}
```
