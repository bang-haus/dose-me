<template>
  <header>
    <div class="wrapper">
      <nav>
        <menu>
          <li class="nav__home">
            <router-link to="/">Dose Me</router-link>
          </li>
          <li class="nav__week">
            <router-link to="/week">Week</router-link>
          </li>
          <li v-for="name in daysMonday" :key="name" class="nav__day" :class="`nav__day--${name}`">
            <router-link :to="`/day/${name}`">
              {{ upperFirst(name) }}
            </router-link>
          </li>
        </menu>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { upperFirst } from '@/helpers/strings'
import { daysMonday } from '@/days'
</script>

<style scoped>
nav {
  padding: 1rem;
}

menu {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {}

a:link {
  text-decoration: none;
}

.nav__week {
  margin-left: auto;
}
</style>
