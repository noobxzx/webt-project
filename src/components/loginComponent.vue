<template>
    <div class="container text-center d-flex flex-column align-items-center vh-100 pt-5">
      <h1 class="login-header mt-5 custom-mb">Login</h1>
      <div class="login-content custom-mb d-flex flex-column align-items-center">
        <form @submit.prevent="validateForm" class="w-100">
          <div class="form-group custom-mb">
            <input
                type="text"
                class="form-control"
                v-model="username"
                placeholder="Username"
                :class="{'is-invalid': usernameError}"
            />
            <div class="invalid-feedback">{{ usernameError }}</div>
          </div>
          <div class="form-group custom-mb">
            <input
                type="password"
                class="form-control"
                v-model="password"
                placeholder="Password"
                :class="{'is-invalid': passwordError}"
            />
            <div class="invalid-feedback">{{ passwordError }}</div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <div v-if="loginSuccess" class="alert alert-success mt-3" role="alert">
          Login successful!
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      loginSuccess: false,
    };
  },
  methods: {
    validateForm: function () {
      this.usernameError = '';
      this.passwordError = '';
      const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!this.username) {
        this.usernameError = 'Username is required.';
      } else if (!usernameRegex.test(this.username)) {
        this.usernameError = 'Please enter a valid email address.';
      }

      if (!this.password) {
        this.passwordError = 'Password is required.';
      }

      if (!this.usernameError && !this.passwordError) {
        this.loginSuccess = true;
      } else {
        this.loginSuccess = false;
      }
    },
  },
};
</script>

<style>
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

.login-header {
  color: #fafaff;
  font-size: 2.2rem;
  animation: fadeIn 2400ms ease-in-out;
  position: relative;
}

.login-content {
  width: 100%;
}

.form-group {
  width: 100%;
}

.custom-mb {
  margin-bottom: 2rem;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  display: block;
  color: #dc3545;
}

.btn-primary {
  background-color: #273469;
  border: none;
  color: #fafaff;
  border-radius: 0.5em;
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  background-color: #1a2746;
}

.alert-success {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 0.5em;
  padding: 1rem;
  font-size: 1rem;
}

@media (max-width: 600px) {
  .container {
    padding-top: 2vh;
  }

  .login-header {
    font-size: 2rem;
  }

  .btn-primary {
    width: 100%;
    margin: 1em 0;
    font-size: 1rem;
  }
}
</style>