# [Day10] - Tab頁籤切換效果 - Web Component 的樣式設定

在 Web Component 中有些特別的 css styling 可以設定 ,

ex : 如果我們想要設定元件根元素 (Root Element) 的底色時 , 可以使用 :host 來做設定

如果我們想要設定 根元素之下的第一層 div 的底色時 , 可以使用 :host(> div) 來做設定

shadow-dom 提供將樣式內外隔離的方式 , 但是當我們真的需要設定一些內外都要有的樣式時 ,

我們可以用 :host-context() 來做設定 , 它會穿過 shadow-dom 將我們想設定的樣式給設定上去

如果想要指定 slot 的底色 , 舉例想要設定 day-08 的 modal-body 它的底色 , 可以用 ::slotted(*) 來做設定

// Pseudo-elements
:defined : 所有使用 CustomElementRegistry.define() 的 Tag 都上色

- Matches any element that is defined, including built in elements and custom elements defined with CustomElementRegistry.define()).

:host

- Selects the shadow host of the shadow DOM containing the CSS it is used inside.

:host(span) : 單個 component 內的 styling

- Selects the shadow host of the shadow DOM containing the CSS it is used inside (so you can select a custom element from inside its shadow DOM) — but only if the selector given as the function's parameter matches the shadow host.

:host-context() : component 內的 styling ( 包括子層 )

-  Selects the shadow host of the shadow DOM containing the CSS it is used inside (so you can select a custom element from inside its shadow DOM) — but only if the selector given as the function's parameter matches the shadow host's ancestor(s) in the place it sits inside the DOM hierarchy.

::part : part 屬性

- The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.

/* Selects any element placed inside a slot */
::slotted(*) {
font-weight: bold;
}

/* Selects any <span> placed inside a slot */
::slotted(span) {
font-weight: bold;
}

下面我們就使用常用的 Tab 頁籤 , 來學習 Web Component 中有哪些特別的 css 設定吧 !

------

## 實作開始

> 處理中... 請稍後查看 <(＿　＿)>

## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [MDN 文件 - interfaces](https://developer.mozilla.org/en-US/docs/Web/API#interfaces)
- [MDN 文件 - Element.insertAdjacentHTML()](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/insertAdjacentHTML)
