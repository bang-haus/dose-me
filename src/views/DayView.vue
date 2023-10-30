<template>
  <div>
    <h1>Day: {{ upperFirst(dayName) }}</h1>
    <router-view />
  </div>
</template>

<script setup>
import {upperFirst} from '@/helpers/strings'
defineProps({
  dayName: String
});
</script>

<style lang="scss" scoped>
</style>
