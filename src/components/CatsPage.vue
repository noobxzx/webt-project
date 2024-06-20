<template>
  <div class="container text-center d-flex flex-column vh-100 pt-5">
    <h1 class="word-header custom-mb custom-mt">Random Cats</h1>
    <div class="search-bar mb-5 d-flex justify-content-center">
      <button class="btn regenerate-button" @click="regenerateBreeds">Regenerate</button>
    </div>
    <div class="buttons mt-md-4">
      <ul class="breed-list list-unstyled d-flex flex-wrap justify-content-center gap-3">
        <li v-for="(breed, index) in randomBreeds" :key="index">
          <button class="btn breed-button" @click="GetPreview(breed.id)">{{ breed.name }}</button>
        </li>
      </ul>
      <div v-if="showDropdown" class="dropdown-menu d-flex align-items-center justify-content-center" @click="closeDropdown">
        <div class="dropdown-content" @click.stop>
          <img class="drop-item img-fluid" :src="breedInfo.url" :alt="breedInfo.name" v-if="breedInfo">
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
      updateInterval: null
    };
  },
  created() {
    this.fetchBreeds();
  },
  beforeUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
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

        if (this.updateInterval) {
          clearInterval(this.updateInterval);
        }

        this.updateInterval = setInterval(() => {
          this.updatePreview(id);
        }, 2500);

      } catch (error) {
        console.error(error);
      }
    },
    async updatePreview(id) {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: {
            breed_ids: id
          }
        });
        this.breedInfo = response.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    closeDropdown() {
      this.showDropdown = false;

      // Clear the interval when closing the dropdown
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }
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
  animation: fadeIn 1s ease-in-out;
}

.word-header {
  color: #f4effa;
  font-size: 2.2rem;
  animation: fadeIn 2400ms ease-in-out;
}

.custom-mt{
  margin-top: 3vh;
}

.custom-mb {
  margin-bottom: 6rem;
}

.search-bar {
  width: 100%;
}

.buttons {
  width: 100%;
}

.regenerate-button {
  color: #fafaff;
  padding: 1em 2.8em;
  background-color: #273469;
  border: 1px solid #273469;
  border-radius: 0.5em;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 100ms ease, transform 300ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.regenerate-button:hover {
  background-color: transparent;
  border: 1px solid #273469;
  color: #fafaff;
  transform: scale(1.07);
}

.breed-list {
  animation: fadeIn 1s ease-in-out;
}

.breed-button {
  background-color: #273469;
  border: none;
  color: #fafaff;
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
  background-color: transparent;
  border: 1px solid #273469;
  color: #fafaff;
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

  .breed-button,
  .regenerate-button {
    width: 70%;
    margin: 1em 0;
    font-size: 1rem;
  }

  .dropdown-content {
    width: 95%;
  }
}
</style>
