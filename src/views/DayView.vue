<template>
  <div>
    <h1>Day: {{ dayName }}</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  props: ['dayName']
}
</script>

<script setup>

</script>

<style lang="scss" scoped>
</style>
