<template>
  <div class="container">
    <div class="word-search">
      <h1>Word Search</h1>
      <div class="search-bar">
        <input type="text" v-model="query" @keyup.enter="searchWord" placeholder="enter a word" />
        <button @click="searchWord">search</button>
      </div>

      <div v-if="wordData" class="results">
        <h2>{{ wordData.word }}</h2>
        <div v-for="(definition, index) in wordData.results" :key="index">
          <p><strong>{{ definition.partOfSpeech }}</strong>: {{ definition.definition }}</p>
        </div>
      </div>

      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      wordData: null,
      error: null,
    };
  },
  methods: {
    async searchWord() {
      if (!this.query) {
        this.error = "please enter a word";
        this.wordData = null;
        return;
      }
      const options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${this.query}`,
        headers: {
          'x-rapidapi-key': '5cac514b7bmshbe5ace51218acb9p1ec6e8jsn9c45a2af52fa',
          'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        },
      };

      try {
        this.error = null;
        const response = await axios.request(options);
        this.wordData = response.data;
      } catch (error) {
        this.error = 'word not found or an error occurred';
        this.wordData = null;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 10%;
}

.word-search {
  padding: 20px;
  text-align: center;
  width: 80%;
  max-width: 500px;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.search-bar input {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  width: calc(100% - 100px);
}

.search-bar button {
  padding: 10px 25px;
  border: none;
  background-color: #912F40;
  color: #FFFFFA;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

.search-bar button:hover {
  background-color: #702632;
}

.results {
  margin-top: 20px;
  text-align: left;
}

.error {
  margin-top: 20px;
  color: #ca4d4d;
}

@media (max-width: 600px) {
  .word-search {
    width: 95%;
    padding: 15px;
  }

  .search-bar input {
    width: 100%;
  }

  .search-bar button {
    width: 100%;
    margin: 10px 0;
  }
}
</style>