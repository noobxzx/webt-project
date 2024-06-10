<template>
  <div id="app">
    <TopBar />
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';

export default {
  name: 'App',
  components: {
    TopBar
  }
}
</script>

<style>
@import url('https://fonts.cdnfonts.com/css/satoshi');
  body {
    background-color: #2F184B;
    margin: 0;
    font-family: 'Satoshi', sans-serif;
  }
</style>
