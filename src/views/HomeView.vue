<template>
  <div class="card card--auth" v-if="!user.isLoggedIn">
    <h1>Dose Me 💊</h1>
    <details open>
      <summary>
        <h2>First time here?</h2>
      </summary>
      <form @submit.prevent="register">
        <fieldset>
          <legend>Register</legend>
          <label>
            Email
            <input type="email" name="email" required>
          </label>
          <label>
            Password
            <input type="password" name="password" required>
          </label>
          <label>
            Confirm Password
            <input type="password" name="confirmPassword" required>
          </label>
          <button type="submit">Register</button>
        </fieldset>
      </form>
    </details>
    <details>
      <summary>
        <h2>Been here before?</h2>
      </summary>
      <form @submit.prevent="logIn">
        <fieldset>
          <legend>Login</legend>
          <label>
            Email
            <input type="email" name="email" required>
          </label>
          <label>
            Password
            <input type="password" name="password" required>
          </label>
          <button type="submit">Login</button>
        </fieldset>
      </form>
    </details>
  </div>
  <div class="card" v-else></div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

const user = useUserStore();

function logIn(event) {
  const fieldset = event.target.querySelector('fieldset');
  fieldset.setAttribute('disabled', '');

  user.authenticate({ email: event.target.elements.email.value, password: event.target.elements.password.value })

}
</script>

<style scoped>
.card {
  margin: 6rem auto;
  width: 25vw;
}

h1 {
  font-size: 4vw;
  text-align: center;
}

details {
  border: 1px solid;
  border-image-slice: 1;
  border-image-source: var(--gradient);
  color: var(--colour-front);
}

details + details {
  margin-top: .5rem;
}

summary {
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

h2 {
  background: var(--gradient);
  color: var(--colour-back);
  font-size: 1.5rem;
  padding: 0 .5rem;
  margin: 0;
}

form {
  padding: .5rem;
}

fieldset {
  display: flex;
  flex-direction: column;
}

label {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
</style>
