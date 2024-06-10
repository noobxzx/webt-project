<template>
  <div class="container">
    <div class="word-search">
      <h1 class="word-header">Word Definition</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="query"
          @keyup="validateInput"
          @keyup.enter="searchWord"
          placeholder="enter a word"
        />
        <div v-if="validationError" class="validation-error">
          <p>{{ validationError }}</p>
        </div>
        <button @click="searchWord">search</button>
      </div>

      <div v-if="loading" class="loading">
        <p>Loading...</p>
      </div>

      <div v-if="wordData" class="results">
        <h2>{{ wordData.word }}</h2>
        <h3>definitions:</h3>
        <div v-for="(definition, index) in wordData.results" :key="index">
          <p>
            <strong>{{ definition.partOfSpeech }}</strong
            >: {{ definition.definition }}
          </p>
        </div>
      </div>

      <div v-if="error && !loading" class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      query: "",
      wordData: null,
      error: null,
      validationError: null,
      loading: false,
    };
  },
  methods: {
    validateInput() {
      const regex = /^[a-zA-Z0-9 ]*$/;
      if (!regex.test(this.query)) {
        this.validationError = "Only A-Z symbols are allowed";
      } else {
        this.validationError = null;
      }
    },
    async searchWord() {
      if (!this.query) {
        this.error = "Please enter a word";
        this.wordData = null;
        return;
      }
      const options = {
        method: "GET",
        url: `https://wordsapiv1.p.rapidapi.com/words/${this.query}`,
        headers: {
          "x-rapidapi-key":
            "5cac514b7bmshbe5ace51218acb9p1ec6e8jsn9c45a2af52fa",
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        },
      };

      this.wordData = null;
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.request(options);
        if (response.status === 200 && response.data) {
          this.wordData = response.data;
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.error = "Word not found!";
        } else {
          this.error = "An error occurred while fetching the word data.";
        }
        this.wordData = null;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.validation-error {
  position: absolute;
  color: #ca4d4d;
  font-size: 1rem;
  width: 100%;
  text-align: left;
  margin-top: 0.5em;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 10vh;
  animation: fadeIn 1s ease-in-out;
}

.word-search {
  justify-content: center;
  padding: 2em;
  text-align: center;
  width: 80%;
  max-width: 50rem;
  position: relative;
}

.word-header {
  color: #f4effa;
  font-size: 2.2rem;
  animation: fadeIn 2400ms ease-in-out;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}

.search-bar input {
  color: #9b72cf;
  background-color: #2f184b;
  margin: 1em;
  padding: 1em;
  border: 1px solid #532b88;
  border-radius: 0.5em;
  width: calc(100% - 10em);
  font-size: 1.2rem;
  transition: border-color 0.3s ease;
}

input::placeholder {
  color: #9b72cf;
}

.search-bar input:focus {
  border-color: #9b72cf;
  color: #f4effa;
  outline: none;
}

.search-bar button {
  background-color: #532b88;
  color: #f4effa;
  padding: 1em 2.5em;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  margin: 1em;
  font-size: 1.1rem;
  transition:
    background-color 100ms ease,
    transform 300ms ease;
}

.search-bar button:hover {
  background-color: #9b72cf;
  transform: scale(1.05);
}

.loading {
  color: #9b72cf;
  margin-top: 2em;
  font-size: 1.2rem;
  animation:
    fadeIn 0,
    5s ease-in-out;
}

.results {
  color: #f4effa;
  margin-top: 2em;
  text-align: left;
  font-size: 1.2rem;
  animation: fadeIn 1s ease-in-out;
}

.error {
  color: #ca4d4d;
  margin-top: 2em;
  font-size: 1.2rem;
  animation: fadeIn 300ms ease-in-out;
}

@media (max-width: 600px) {
  .word-search {
    width: 95%;
    padding: 1.5em;
  }

  .search-bar input {
    width: 100%;
    font-size: 1rem;
  }

  .search-bar button {
    width: 70%;
    margin: 1em 0;
    font-size: 1rem;
  }

  .word-header {
    font-size: 2rem;
  }

  .results,
  .error {
    font-size: 1rem;
  }
}
</style>
