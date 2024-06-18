<template>
  <div class="custom-container">
    <div class="word-search">
      <h1 class="word-header">Word Definition</h1>
      <div class="search-bar">
        <input
            type="text"
            class="custom-input"
            :class="{'is-invalid': validationError}"
            v-model="query"
            @keyup="validateInput"
            @keyup.enter="searchWord"
            placeholder="enter a word"
        />
        <div v-if="validationError" class="validation-error">
          <p>{{ validationError }}</p>
        </div>
        <button class="custom-button" @click="searchWord">search</button>
      </div>

      <div v-if="loading" class="loading">
        <p>Loading...</p>
      </div>

      <div v-if="wordData" class="results card-body">
        <h2>{{ wordData.word }}</h2>
        <h3>Definitions:</h3>
        <div v-for="(definition, index) in wordData.results" :key="index" class="definition">
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
import DOMPurify from "dompurify";

export default {
  data() {
    return {
      query: "",
      wordData: null,
      error: null,
      validationError: null,
      loading: false,
      token: process.env.VUE_APP_RAPIDAPI_KEY,
    };
  },
  methods: {
    validateInput() {
      const regex = /^[a-zA-Z0-9 ]*$/;
      if (!regex.test(this.query)) {
        this.validationError = "Only English letters and numbers are allowed.";
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
      if (this.validationError) {
        this.error = "Please enter a valid word";
        return;
      }

      const sanitizedQuery = DOMPurify.sanitize(this.query);

      // Log the sanitized input to the console
      console.log("Sanitized Query:", sanitizedQuery);

      const options = {
        method: "GET",
        url: `https://wordsapiv1.p.rapidapi.com/words/${sanitizedQuery}`,
        headers: {
          "x-rapidapi-key": this.token,
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
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.custom-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 5vh;
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
  color: #fafaff;
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

.custom-input {
  color: #e4d9ff;
  background-color: #1e2749;
  margin-bottom: 2em;
  margin-top: 2em;
  padding: 1em;
  border: 1px solid #273469;
  border-radius: 0.5em;
  width: calc(100% - 1em);
  font-size: 1.2rem;
  transition: border-color 0.3s ease;
}

.custom-input.is-invalid {
  border-color: #ca4d4d;
}

.custom-input::placeholder {
  color: #e4d9ff;
  font-size: 1.2rem;
}

.custom-input:focus {
  border-color: #e4d9ff;
  color: #fafaff;
  outline: none;
}

.validation-error {
  position: absolute;
  color: #ca4d4d;
  font-size: 1rem;
  width: 100%;
  text-align: left;
  margin-top: 1em;
  left: 1em;
}

.custom-button {
  background-color: #273469;
  color: #fafaff;
  padding: 1em 2.8em;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  margin: 1em;
  font-size: 1.1rem;
  transition: background-color 100ms ease, transform 300ms ease;
}

.custom-button:hover {
  background-color: transparent;
  border: 1px solid #273469;
  transform: scale(1.05);
}

.loading {
  color: #fafaff;
  margin-top: 2em;
  font-size: 1.2rem;
  animation: fadeIn 1s ease-in-out;
}

.results {
  color: #fafaff;
  margin-top: 2em;
  margin-left: 1em;
  text-align: left;
  font-size: 1.2rem;
  animation: fadeIn 1s ease-in-out;
}

.definition {
  border-bottom: 1px solid #fafaff;
  padding-bottom: 1em;
  margin-bottom: 1em;
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

  .search-bar .custom-input {
    width: 100%;
    font-size: 1rem;
  }

  .search-bar .custom-button {
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
