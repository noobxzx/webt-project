<template>
  <div id="app">
    <TopBar />
    <div class="center-container">
      <Rectangle/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import Rectangle from './components/GamesBar.vue';

export default {
  name: 'App',
  components: {
    TopBar,
    Rectangle
  }
}
</script>

<style>
@import url('https://fonts.cdnfonts.com/css/satoshi');
html, body {
  background-color: #2f184b !important;
  margin: 0;
  height: 100vh;
  font-family: 'Satoshi', sans-serif;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(10vh - 60px);
  margin-top: 5px;

  @media (max-height: 800px){
    margin-top: 30px;
  }
}
</style>
