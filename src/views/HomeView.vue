<template>
  <div class="card">
    <h1>Dose Me 💊</h1>
    <div v-if="!user.isLoggedIn">
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
              <input type="password" name="password" minlength="6" required>
            </label>
            <label>
              Confirm Password
              <input type="password" name="confirmPassword" required @keyup="resetValidity">
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
    <div v-else>
      poop
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

const user = useUserStore();

async function logIn(event) {
  const fieldset = event.target.querySelector('fieldset');
  fieldset.setAttribute('disabled', '');

  await user.authenticate({
    email: event.target.elements.email.value,
    password: event.target.elements.password.value
  });

  fieldset.removeAttribute('disabled');
}

async function register(event) {
  const { email, password, confirmPassword } = event.target.elements;

  if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity('Passwords must match');
  } else {
    confirmPassword.setCustomValidity('');
  }

  confirmPassword.reportValidity();

  if (event.target.checkValidity()) {
    const fieldset = event.target.querySelector('fieldset');
    fieldset.setAttribute('disabled', '');

    await user.register({
      email: email.value,
      password: password.value
    });

    fieldset.removeAttribute('disabled');
  }
}

function resetValidity(event) {
  event.target.setCustomValidity('');
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

details+details {
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
