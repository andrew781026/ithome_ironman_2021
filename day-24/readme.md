# [Day24] - 介紹 Svelte.js 如何使用

前幾天我們有說明 Virtual Dom 如何實作 ,

今天我們來介紹一個 `反對 Virtual Dom` 的工具 [Svelte.js](https://svelte.dev/)

![Svelte.js LOGO](https://i.imgur.com/D9xn0vD.png)

## 內文

Svelte.js 也是一個 Compiler 工具的 Web Component 編譯器( ~~框架~~ )

所以開頭就是用 CLI 建立專案拉 ~~

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 利用 Svelte REPL 建立新專案

```shell
npm init svelte@next my-app
cd my-app
npm install
npm run dev
```

```shell
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
# to use TypeScript run:
# node scripts/setupTypeScript.js

npm install
npm run dev
```

...待補~~

## 參考資料

- [svelte.js 官方 docs](https://svelte.dev/)
- [svelteKit 官方 docs](https://kit.svelte.dev/docs)
- [Svelte — 是什麼讓我遇見這樣的你](https://blog.kalan.dev/2020-04-19-svelte-%E2%80%94-%E6%98%AF%E4%BB%80%E9%BA%BC%E8%AE%93%E6%88%91%E9%81%87%E8%A6%8B%E9%80%99%E6%A8%A3%E7%9A%84%E4%BD%A0/)
- [How to Create a Web Component in Svelte](https://dev.to/silvio/how-to-create-a-web-components-in-svelte-2g4j)
