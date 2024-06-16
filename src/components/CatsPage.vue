<template>
  <div class="container">
    <h1 class="word-header">Random Cats</h1>
    <div class="search-bar">
      <button class="regenerate-button" @click="regenerateBreeds">Regenerate</button>
    </div>
    <div class="buttons">
      <ul class="breed-list">
        <li v-for="(breed, index) in randomBreeds" :key="index">
          <button class="breed-button" @click="GetPreview(breed.id)">{{ breed.name }}</button>
        </li>
      </ul>
      <div v-if="showDropdown" class="dropdown-menu" @click="closeDropdown">
        <div class="dropdown-content" @click.stop>
          <img class="drop-item" :src="breedInfo.url" :alt="breedInfo.name" v-if="breedInfo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      breeds: [],
      randomBreeds: [],
      breedInfo: null,
      showDropdown: false,
    };
  },
  created() {
    this.fetchBreeds();
  },
  methods: {
    async fetchBreeds() {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        console.log(response.data);
        this.breeds = response.data;
        this.regenerateBreeds();
      } catch (error) {
        console.error(error);
      }
    },
    regenerateBreeds() {
      this.randomBreeds = this.breeds.sort(() => 0.5 - Math.random()).slice(0, 5);
    },
    async GetPreview(id) {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: {
            breed_ids: id
          }
        });
        this.breedInfo = response.data[0];
        this.showDropdown = true;
      } catch (error) {
        console.error(error);
      }
    },
    closeDropdown() {
      this.showDropdown = false;
    }
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

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 7.2vh;
  animation: fadeIn 1s ease-in-out;
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
  width: 100%;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
  width: 100%;
}

.regenerate-button {
  background-color: transparent;
  color: #f4effa;
  padding: 1em 2.8em;
  border: 1px solid #532b88;
  border-radius: 0.5em;
  cursor: pointer;
  margin: 2em;
  font-size: 1.1rem;
  transition: background-color 100ms ease, transform 300ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.regenerate-button:hover {
  transform: scale(1.07);
}

.breed-list {
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  animation: fadeIn 1s ease-in-out;
  flex-wrap: wrap;
}

.breed-list li {
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 10px 0;
}

.breed-button {
  background-color: #421a6b;
  border: none;
  color: #f4effa;
  border-radius: 0.5em;
  padding: 15px 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.breed-button:hover {
  background-color: #421a6b;
  transform: scale(1.07);
}

.dropdown-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.3s ease-in-out;
  z-index: 1000;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  animation: fadeIn 1s ease-in-out;
}

.drop-item {
  max-width: 100%;
  animation: fadeIn 1s ease-in-out;
}

@media (max-width: 600px) {
  .container {
    padding-top: 2vh;
  }

  .word-header {
    font-size: 2rem;
  }

  .buttons {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .breed-button,
  .regenerate-button {
    width: 70%;
    margin: 1em 0;
    font-size: 1rem;
  }

  .breed-list {
    font-size: 1rem;
    flex-direction: column;
    align-items: center;
  }

  .dropdown-content {
    width: 95%;
  }
}
</style>
