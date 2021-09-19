# 利用 Vue CLI 3 來建立 Web Components 的 JS 檔

```shell script
$ vue create vue-web-component-project
```

![利用Vue CLI 3 , 建立 Vue 2](https://i.imgur.com/LP6N8oW.png)

![建立專案中...](https://i.imgur.com/mNuzsp9.png)



```shell
$ vue-cli-service build --target wc --name my-custom-element ./src/main.js
```

解說一下上方的一些參數

- --target : wc 代表建立 Web-Component
- --name : Web-Component 的名稱 ( tag-name )
- ./src/main.js : compile 的來源檔案

## 參考資料 

- [Create & Publish Web Components With Vue CLI 3](https://vuejsdevelopers.com/2018/05/21/vue-js-web-component/)
