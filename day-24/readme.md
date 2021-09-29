# [Day24] - 介紹 Svelte.js 如何使用

前幾天我們有說明 Virtual Dom 如何實作 ,

今天我們來介紹一個 `反對 Virtual Dom` 的工具 [Svelte.js](https://svelte.dev/)

![Svelte.js LOGO](https://i.imgur.com/D9xn0vD.png)

## 內文

Svelte.js 也是一個 Compiler 工具的 Web Component 編譯器( ~~框架~~ )

所以開頭就是用 CLI 建立專案拉 ~~

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 利用 Svelte REPL 建立新專案

> Svelte 的 CLI 改名很多次 `Svelte REPL` . `Svelte CLI` . `SvelteKit` 都是指 CLI 工具

```shell
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
# to use TypeScript run:
# node scripts/setupTypeScript.js

npm install
npm run dev
```

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 在設定檔中開啟 web component 的設定

> 在 `rollup.config.js` 檔中 加上 `customElement: true` 

```javascript
 plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
        ...
      }
      ...
    }),
    ...
  ]
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 使用 `<svelte:options tag="[tag-name]" />` 來定義 web component 

App.svelte
```
<svelte:options tag="what-ever" />

<script>
  // make sure component Foo is available, but we don't import
  // it... we'll use it with it's tag <my-foo /> (see bellow)
  import './Foo.svelte'
  export let name = 'World'
</script>

<p>Hello, {name}!</p>

<my-foo {name} />

<style>
 p { color: skyblue; }
</style>
```

Foo.svelte
```
<svelte:options tag="my-foo" />

<script>
  export let name
</script>

<p>I am {name}</p>
```

![four](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/four.png) 註解 App 的掛載

main.js
```
// 雖然 App 的沒被使用 , 但是需要將 import App.svelte , 
// svelte 才知道要將 App.svelte 內設定的 svelte:options 轉換成 web component
import App from './App.svelte';

/*
// 註解 new App 避免 svelte 的掛載行為 , 我們只需要 web component
const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});
 */

export default app;

```

## 成果

![](https://i.imgur.com/Rr03Jb8.png)

## 參考資料

- [svelte.js 官方 docs](https://svelte.dev/)
- [svelteKit 官方 docs](https://kit.svelte.dev/docs)
- [Svelte — 是什麼讓我遇見這樣的你](https://blog.kalan.dev/2020-04-19-svelte-%E2%80%94-%E6%98%AF%E4%BB%80%E9%BA%BC%E8%AE%93%E6%88%91%E9%81%87%E8%A6%8B%E9%80%99%E6%A8%A3%E7%9A%84%E4%BD%A0/)
- [How to Create a Web Component in Svelte](https://dev.to/silvio/how-to-create-a-web-components-in-svelte-2g4j)
- [Svelte Custom element API](https://stackoverflow.com/questions/60529034/svelte-custom-element-api)
