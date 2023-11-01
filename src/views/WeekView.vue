<template>
  <div>
    <h1>Week</h1>
    <ul>
      <li v-for="day in daysMonday" :key="day">
        <h2>{{ day }}</h2>
        <h3>Morning</h3>
        <ul>
          <li v-for="[key, medication] in dayMedications(day, 'am')" :key="key">{{ medication.name }}
          </li>
        </ul>
        <h3>Afternoon</h3>
        <ul>
          <li v-for="[key, medication] in dayMedications(day, 'pm')" :key="key">{{ medication.name }}
          </li>
        </ul>
      </li>
    </ul>
    <medication-form @createUpdate="createUpdate" :processing="processing" />
  </div>
</template>

<script setup>
import { daysMonday } from '@/days'
import { useMedicationsStore } from '@/stores/medications'
import MedicationForm from '@/components/MedicationForm.vue'
import { ref } from 'vue';

const medications = useMedicationsStore();
const processing = ref('');

const dayMedications = (day, period) => {
  const dayMeds = new Map();

  medications.medications.forEach((med, key) => {
    if (med.period === period && med.days[day]) {
      dayMeds.set(key, med);
    }
  });

  return dayMeds;
};

async function createUpdate(data) {
  processing.value = 'processing';

  const didCreate = await medications.createUpdate(data);

  if (didCreate) {
    processing.value = 'success';
  } else {
    processing.value = 'error';
  }
}
</script>

<style scoped>
h2 {
  background: linear-gradient(to right, var(--colour-ui), var(--colour-b-mid));
  color: var(--colour-back);
  font-size: 1.5rem;
  padding: 0 .5rem;
  margin: 0;
}

h3 {
  font-size: 1rem;
  font-weight: 400;
  padding: .5rem;
  margin: 0;
}

ul {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  margin: 0;
  padding: 0;
}

ul>li {
  border: 1px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to right, var(--colour-ui), var(--colour-b-mid));
  border-width: 1px;
  overflow: hidden;
}

ul ul {
  display: flex;
  flex-direction: column;
  padding: .5rem;
}

ul ul li {
  padding: 0 .5rem;
}
</style>
