<template>
  <header class="top-bar">
    <div class="logo">Worod</div>
    <nav class="nav-buttons">
      <button class="btn btn-link nav-button" @click="navigate('/about')">
        <i class="fas fa-info-circle"></i>
      </button>
      <button class="btn btn-link nav-button" @click="navigate('/account')">
        <i class="fas fa-user"></i>
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    navigate(destination) {
      this.$router.push(destination);
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

:root {
  font-size: 16px;
}

.top-bar {
  background-color: #2f184b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  animation: fadeIn 1.7s ease-in-out;
}

.logo {
  color: #f4effa;
  font-size: 2rem;
  font-weight: bold;
}

.nav-buttons {
  display: flex;
  gap: 1.5em;
}

.nav-button {
  color: #f4effa;
  background-color: transparent;
  border: none;
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
  background-color: #532b88;
  color: #f4effa;
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
