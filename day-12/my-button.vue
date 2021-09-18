<template>
  <button :style="{backgroundColor:bgColor}" :disabled="disabled">購買</button>
</template>

<script>
  module.exports = {
    mounted() {
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
      addCost(amount) {
        console.log(`追加消費 ${amount} 點`)
        this.cost += amount
      },
      minusCost(amount) {
        console.log(`減少花費 ${amount} 點`)
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

<style>
  body {
    margin: 100px;
  }

  button {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    color: white;
  }
</style>
