<template>
  <dialog v-if="alert.type && alert.message" open class="alert" :class="`alert--${alert.type}`">
    <button type="button" @click.prevent="alert.clear">
      &cross;
    </button>
    {{ alert.message }}
  </dialog>
</template>

<script setup>
import { useAlertStore } from '@/stores/alert';

const alert = useAlertStore();
</script>

<style lang="scss" scoped>
</style>
