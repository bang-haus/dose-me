<template>
  <app-header />
  <main>
    <router-view />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
main {
  padding: 0 1rem;
}
</style>
