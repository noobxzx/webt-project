<template>
  <div id="app">
    <TopBar />
    <WordSearch />
  </div>
</template>

<script>
import WordSearch from './components/WordSearch.vue';
import TopBar from './components/TopBar.vue';

export default {
  name: 'App',
  components: {
    WordSearch,
    TopBar
  }
}
</script>

<style>
@import url('https://fonts.cdnfonts.com/css/satoshi');
  body {
    background-color: #FFFFFA;
    margin: 0;
    font-family: 'Satoshi', sans-serif;
  }
</style>
