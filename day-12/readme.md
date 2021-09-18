# [Day12] - Tooltip 元件 - 追加 render 函式

在 React 跟 Vue 中我們可以較為輕鬆的利用資料 來做 render 對應的話畫面生出來

不用像 Jquery 時期 , 改變資料時 , 需要將對應的 dom 做修改 , 有時還會發生這裡改了 , 那裡忘記改的狀況

舉個例子來說 , 下方有個商業的案例 , 來控制 `按鈕` 的顯示

- 當客戶花費點數 > 儲值點數 , 按鈕顯示灰色並且禁止點擊 
- 當客戶花費點數 = 儲值點數 , 按鈕顯示橘色 
- 當客戶花費點數 < 儲值點數 , 按鈕顯示綠色 

在 Jquery 我們可能會這樣寫 Code 

```javascript
// .btn = 按鈕 / cost = 花費點數 / left = 儲值點數
let cost = 0 , left = 500

function costChange() {

    if ( cost > left )  $('.btn').css({backgroundColor:'gary'}).prop('disabled',true)
    else if ( cost === left ) $('.btn').css({backgroundColor:'orange'})
    else  $('.btn').css({backgroundColor:'green'})
}

function addCost(amount) {
    cost += amount
    costChange()
}

function minusCost(amount) {
    cost -= amount
    costChange()
}
```

初看 Code 時 , 會覺得蠻正常的 , 將文字描述都轉換成 Jquery Code ,

可是當客戶在調整購買項目 (多買一個法帳 . 少買一個套裝) 後 , 就會發現按鈕不能點 sad icon

![](https://i.imgur.com/MyW8oNV.gif)

這時我們才想到 , 客戶買超過後 , 再將東西扣回來 , 我們需要將那個 disabled 給拿掉

然後我們再改版 Code , 購買金額減少時 , 將 disabled 拿掉

```javascript
// .btn = 按鈕 / cost = 花費點數 / left = 儲值點數
function costChange(cost , left) {

    if ( cost > left )  $('.btn').css({backgroundColor:'gary'}).prop('disabled',true)
    else if ( cost === left ) $('.btn').css({backgroundColor:'orange'}).prop('disabled',false)
    else  $('.btn').css({backgroundColor:'green'}).prop('disabled',false)
}
```

![](https://i.imgur.com/sTrRtOx.gif)

沒有登入 , 就可以消費點數 , 變成隨便人都可以花你的剩餘點數 , 補上個登入狀態吧

```javascript
// .btn = 按鈕 
function login() {

     $('.btn').prop('disabled',false)
}

function logout() {

     $('.btn').prop('disabled',true)
}
```

登出後 , 不能買東西 , 運作正常 `hapy icon` ,
可是先將要買的東西塞滿 , 再登入 , 奇怪 `wired icon` 可以買東西 `偷笑 icon` 我們利用這個 BUG 將東西買好買滿吧 `讚 icon`

> 可以買東西 img

然後 , 我們需要在登入時 , 多傳入與判斷 `花費點數 & 儲值點數` 這種與登入登出無關的參數

```javascript
// .btn = 按鈕 
function login(cost , left) {

 if ( cost > left )  $('.btn').prop('disabled',true)
 else  $('.btn').prop('disabled',false)
 costChange()
}
```

這時我們就會發現 , 在按鈕的狀態控制上 , 利用 Jquery 直接改變 DOM 的行為 , 好像不是個好做法

那如果在 Vue 中會如何處理呢 ?

```html
<template>
    <button :style="{backgroundColor:bgColor}" :disabled="disabled">購買</button>
</template>

<script>
    export default {
        methods: {
            login() {
                this.isLogin = true
            },
            logout() {
                this.isLogin = false
            },
            addCost(amount) {
                this.cost += amount
            },
            minusCost(amount) {
                this.cost -= amount
            }
        },
        computed: {
            notLogin() {
                return !this.isLogin
            },
            disabled() {
                if (this.notLogin) return true
                else if (this.cost > this.left) return true
                else return false
            },
            bgColor() {
                if (this.notLogin) return 'gray'
                else if (this.cost > this.left) return 'gray'
                else if (this.cost === this.left) return 'orange'
                else return 'green'
            }
        },
        data() {

            return {
                cost: 0,
                left: 500, 
                isLogin: false
            }
        }
    }
</script>
```

你可以發現 , 如果控制 button 的條件增加 , 我們也可以較為輕鬆的利用 `computed` 中的 `disabled()` 來算出是否需要 disabled

-----

可是目前 WebComponent 中沒有 Vue 阿 ! 我們要如何達到按鈕的狀態控制呢 ?

其實只要在變更資料時 , render 要生成的 html 可以很簡單的達到狀態控制歐 !



## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [Vue 官方文件](https://v3.vuejs.org/guide/introduction.html)
