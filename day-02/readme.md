什麼事 web component ? 

-> Vue 在初期設計時 , 有參考 Web Component 的概念去做 ?
    (需要找出處)

### 一些特別的 WebComponent

- [Wired Elements](https://wiredjs.com/) - 手繪感十足的原件

### WebComponent 的金三角

- Custom elements（自定义元素）：一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。
- Shadow DOM（影子DOM）：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- HTML templates（HTML模板）： <template> 和 <slot> 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

```css
/*
这在你有一个复杂的自定义元素需要一段时间才能加载到页面中时非常有用 
    —— 你可能想要隐藏元素的实例直到定义完成为止，这样你就不会在页面上出现一些难看的元素。
*/

simple-custom:not(:defined) {
  display: none;
}

simple-custom:defined {
  display: block;
}
```
