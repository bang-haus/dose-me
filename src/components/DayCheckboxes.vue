<template>
  <label v-for="day in daysMonday" :key="day">
    <input type="checkbox" :id="day" :name="day" :checked="meddays && meddays[day]" :ref="day">
    {{ upperFirst(day) }}
  </label>
  <button type="button" @click.prevent="toggleDays = !toggleDays">
    {{ toggleDays ? 'Uncheck all days' : 'Check all days' }}
  </button>
</template>

<script setup>
import { ref, watch } from 'vue';
import { daysMonday } from '@/days.js';
import { upperFirst } from '@/helpers/strings';

const monday = ref(null);
const tuesday = ref(null);
const wednesday = ref(null);
const thursday = ref(null);
const friday = ref(null);
const saturday = ref(null);
const sunday = ref(null);
const dayRefs = { monday, tuesday, wednesday, thursday, friday, saturday, sunday };
const toggleDays = ref(false);

watch(toggleDays, (newVal) => {
  monday.value.checked = newVal;
  for (const dayRef in dayRefs) {
    dayRefs[dayRef].value[0].checked = newVal;
  }
});

defineProps(['meddays']);
</script>

<style scoped>
</style>
