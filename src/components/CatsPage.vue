<template>
  <div class="container">
    <h1 class="word-header">Random Cats</h1>
    <div class="search-bar">
      <button class="regenerate-button" @click="regenerateBreeds">Regenerate</button>
    </div>
    <ul class="breed-list">
      <li v-for="(breed, index) in randomBreeds" :key="index">
        <button class="breed-button" @click="getMoreInfo(breed.id)">{{ breed.name }}</button>
      </li>
    </ul>
    <div v-if="showDropdown" class="dropdown-menu" @click="closeDropdown">
      <div class="dropdown-content" @click.stop>
        <img class="drop-item" :src="breedInfo.url" :alt="breedInfo.name" v-if="breedInfo">
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
    async getMoreInfo(id) {
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
  padding-top: 8vh;
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
}

.regenerate-button {
  background-color: #532b88;
  color: #f4effa;
  padding: 1em 2.5em;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  margin: 1em;
  font-size: 1.1rem;
  transition: background-color 100ms ease, transform 300ms ease;
}

.regenerate-button:hover {
  background-color: #9b72cf;
  transform: scale(1.05);
}

.breed-list {
  list-style-type: none;
  padding: 0;
  margin: 1em 0;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  animation: fadeIn 1s ease-in-out;
}

.breed-list li {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.breed-button {
  background-color: #532b88;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.breed-button:hover {
  background-color: #421a6b;
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

  .breed-button,
  .regenerate-button {
    width: 70%;
    margin: 1em 0;
    font-size: 1rem;
  }

  .breed-list {
    font-size: 1rem;
  }

  .dropdown-content {
    width: 95%;
  }
}
</style>

