<template>
  <div>
    <h2>目前有 <span class="left">{{left}}</span> 點數</h2>
    <h2>預計花費 <span class="cost">{{cost}}</span> 點數</h2>
    <button class="btn" :style="{backgroundColor:bgColor}" :disabled="disabled" @click="buy">
      購買
    </button>
    <h2></h2>
    <button @click="login">登入</button>
    <button @click="logout">登出</button>
    <h2></h2>
    <button @click="addCost(100)">加買法帳( 100 點 )</button>
    <button @click="minusCost(100)" :disabled="cost === 0">減買法帳( 100 點 )</button>
  </div>
</template>

<script>
  module.exports = {
    mounted() {
      // console.log(`目前有 ${this.left} 點`)
      window.login = this.login
      window.logout = this.logout
      window.addCost = this.addCost
      window.minusCost = this.minusCost
    },
    methods: {
      login() {
        this.isLogin = true
      },
      logout() {
        this.isLogin = false
      },
      buy(){
        this.left -= this.cost
        this.cost = 0
      },
      addCost(amount) {
        this.cost += amount
        // console.log(`追加消費 ${amount} 點，預計花費 ${this.cost} 點`)
      },
      minusCost(amount) {
        this.cost -= amount
        // console.log(`減少花費 ${amount} 點，預計花費 ${this.cost} 點`)
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

<style>
  body {
    margin: 100px;
  }

  button.btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    color: white;
  }

  button:disabled {
    cursor: not-allowed;
  }
</style>
