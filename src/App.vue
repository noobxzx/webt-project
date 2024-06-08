<template>
  <div id="app">
    <WordSearch />
  </div>
</template>

<script>
import WordSearch from './components/WordSearch.vue';

export default {
  name: 'App',
  components: {
    WordSearch,
  }
}
</script>

<style>
  body {
    background-color: #FFFFFA;
    margin: 0;
    font-family: Arial, sans-serif;
  }
</style>
