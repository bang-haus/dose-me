<template>
  <app-header  v-if="user.isLoggedIn" />
  <main>
    <router-view />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { useUserStore } from '@/stores/user';
import AppHeader from '@/components/AppHeader.vue';

const user = useUserStore();
</script>

<style scoped>
main {
  padding: 0 1rem;
}
</style>
