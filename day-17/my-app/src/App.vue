<template>
  <div id="app">
    <h1>Vue ❤ Web Components</h1>
    <div class="container">
      <word-count :limit="limit">
        <h3>個人自介</h3>
        <textarea class="needcount" rows="10" placeholder="請輸入您的個人描述...">
        </textarea>
      </word-count>
    </div>
  </div>
</template>

<script>
  export default {
    data(){

      return {
        limit : 100
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');

  * {
    font-family: 'Noto Sans TC', sans-serif;
  }

  body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: #64cfff;
    margin: 0;
  }

  .container{
    width: 550px;
    padding: 10px 40px;
    background-color: #e3f2fd;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .container textarea{
    border-radius: 4px;
    position: relative;
    resize: none;
    padding: 10px;
    width: 95%;
    border: none;
    outline: none;
  }

  .container textarea:focus{
    border: 2px solid black;
  }
</style>
