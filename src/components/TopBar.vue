<template>
  <header class="top-bar">
    <div class="logo">Meower</div>
    <nav class="nav-buttons">
      <button class="nav-button" @click="navigate('About')">
        <i class="fas fa-info-circle"></i>
      </button>
      <button class="nav-button" @click="navigate('Account')">
        <i class="fas fa-user"></i>
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TopBar',
  methods: {
    navigate(destination) {
      console.log(`Navigating to ${destination}`);
    }
  }
}
</script>

<style scoped>
:root {
  font-size: 16px; /* Base font size */
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  background-color: #FFFFFA;
}

.logo {
  font-size: 1.75rem;
  font-weight: bold;
  color: #40434E;
}

.nav-buttons {
  display: flex;
  gap: 1.5em;
}

.nav-button {
  background-color: transparent;
  border: none;
  color: #080705;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.75em 1em;
  border-radius: 0.5em;
  transition: background-color 0.3s ease;
}

.nav-button i {
  font-size: 1.5rem;
}

.nav-button:hover {
  background-color: #40434E;
  color: #FFFFFA;
}

@media (max-width: 600px) {
  .top-bar {
    padding: 0.5em 1em;
  }

  .logo {
    font-size: 1.5rem;
  }

  .nav-buttons {
    gap: 1em;
  }

  .nav-button {
    font-size: 1rem;
    padding: 0.5em 0.75em;
  }

  .nav-button i {
    font-size: 1.25rem;
  }
}
</style>
