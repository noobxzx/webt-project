<template>
  <div class="container text-center d-flex flex-column align-items-center vh-100 pt-5">
    <h1 class="login-header mt-5 custom-mb">Login</h1>
    <div class="login-content d-flex flex-column align-items-center">
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
      <div v-if="loginSuccess" class="alert alert-success mt-5" role="alert">
        Login successful!
      </div>
    </div>
  </div>
</template>

<script>
import DOMPurify from "dompurify";
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
      const sanitizedUser = DOMPurify.sanitize(this.username);
      const sanitizedPassword = DOMPurify.sanitize(this.password);
      console.log("Sanitized Username: ", sanitizedUser);
      console.log("Sanitized Password: ", sanitizedPassword);

      this.usernameError = '';
      this.passwordError = '';
      const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!sanitizedUser) {
        this.usernameError = 'Username is required.';
      } else if (!usernameRegex.test(sanitizedUser)) {
        this.usernameError = 'Please enter a valid email address.';
      }

      if (!sanitizedPassword) {
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

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes buttonHover {
  from {
    background-color: #273469;
  }
  to {
    background-color: transparent;
    border: 1px solid #273469;
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
  margin-bottom: 3.5rem;
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

.form-control{
  color: #fafaff;
  background-color: #1a2240 !important;
  border: 1px solid #273469;
  border-radius: 0.5em;
  font-size: 1.1rem;
  padding: 20px 15px;
  height: 60px;
}

.form-control::placeholder {
  color: #e4d9ff;
  font-size: 1.1rem;
}


.form-control:focus {
  color: #fafaff;
  font-size: 1.1rem;
  border-color: #e4d9ff;
  box-shadow: none;
}

.btn-primary {
  border: 1px solid #273469;
  background-color: #273469;
  color: #fafaff;
  border-radius: 0.5em;
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  animation: buttonHover 0.3s forwards;
}

.alert-success {
  background-color: #28a745;
  color: #fafaff;
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
