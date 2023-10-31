<template>
  <header>
    <div class="wrapper">
      <router-link to="/">Dose Me 💊</router-link>
      <nav v-if="$route.name !== 'home'">
        <menu>
          <li class="nav__week">
            <router-link to="/week">Week</router-link>
          </li>
          <li v-for="name in daysMonday" :key="name" class="nav__day" :class="`nav__day--${name}`">
            <router-link :to="`/day/${name}`">
              {{ upperFirst(name) }}
            </router-link>
          </li>
          <li>
            <a href="#" @click.prevent="user.logOut">Logout</a>
          </li>
        </menu>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { upperFirst } from '@/helpers/strings'
import { daysMonday } from '@/days'

const user = useUserStore();
</script>

<style scoped>
header {
  background-color: var(--colour-ui);
  height: 4rem;
  padding: 1rem;
}

.wrapper {
  display: flex;
}

nav {}

menu {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {}

a:link,
a:visited {
  color: var(--colour-back);
  font-weight: 700;
  text-decoration: none;
}

.nav__week {
  margin-left: auto;
}
</style>
