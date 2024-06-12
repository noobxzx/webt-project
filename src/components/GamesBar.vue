<template>
  <div class="rectangle">
    <nav class="nav-buttons">
      <button class="nav-button" @click="navigate('/')">definitions</button>
      <button class="nav-button" @click="navigate('/quiz')">antonyms</button>
      <button class="nav-button" @click="navigate('/copters')">copters</button>
      <button class="nav-button" @click="navigate('/local-words')">pics</button>
    </nav>
    <button class="dropdown-button" @click="toggleDropdown">menu</button>
    <div v-if="showDropdown" class="dropdown-menu" @click.self="toggleDropdown">
      <div class="dropdown-content">
        <button class="dropdown-item" @click="navigate('/')">definitions</button>
        <button class="dropdown-item" @click="navigate('/quiz')">antonyms</button>
        <button class="dropdown-item" @click="navigate('/copter')">copters</button>
        <button class="dropdown-item" @click="navigate('/pics')">pics</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GamesBar",
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    navigate(destination) {
      this.$router.push(destination);
      this.showDropdown = false;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
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

.rectangle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1em;
  border: 1px solid #532b88;
  background-color: transparent;
  width: 70%;
  max-width: 900px;
  height: 52px;
  margin-top: 2vh;
  padding: 0 1em;
  transition: all 0.3s ease-in-out;
}

.nav-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.nav-button {
  flex: 1;
  height: 100%;
  border: none;
  border-radius: 0.5em;
  margin: 0 0.5em;
  font-size: 1.1rem;
  background-color: transparent;
  color: #9b72cf;
  position: relative;
}

.nav-button::after {
  content: '';
  position: absolute;
  top: 0;
  right: -0.5em;
  width: 1px;
  height: 100%;
  background-color: #532b88;
}

.nav-button:last-child::after {
  display: none;
}

.nav-button:hover {
  color: #f4effa;
  transition: color 0.4s ease;
}

.dropdown-button {
  display: none;
  background-color: transparent;
  color: #9b72cf;
  border: none;
  border-radius: 0.5em;
  padding: 0.5em 1em;
  font-size: 1.1rem;
}

.dropdown-button:hover {
  color: #f4effa;
  transition: color 0.4s ease;
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
  width: 80%;
  max-width: 300px;
}

.dropdown-item {
  width: 100%;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.5em;
  margin: 0.5em 0;
  background-color: #532b88;
  color: #9b72cf;
  font-size: 1.1rem;
  text-align: center;
}

.dropdown-item:hover {
  background-color: #532b88;
  color: #f4effa;
  transition: background-color 0.4s ease, color 0.4s ease;
}

@media (max-width: 900px) {
  .rectangle {
    width: 75%;
    height: 45px;
  }
}

@media (max-width: 500px) {
  .rectangle {
    width: 40%;
    height: 40px;
    margin-top: 25px;
    border-radius: 0.4em;
  }

  .nav-buttons {
    display: none;
  }

  .dropdown-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-height: 800px) {
  .rectangle {
    height: 40px;
  }
}
</style>
