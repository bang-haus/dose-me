import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useMedicationsStore = defineStore('medications', () => {
  const medications = reactive([
    {
      medicationID: '0000000',
      name: 'Leflunomide',
      quantity: 1,
      dose: 20,
      period: 'am',
      days: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      },
      sort: 0
    },
    {
      medicationID: '0000001',
      name: 'Leflunomide',
      quantity: 1,
      dose: 20,
      period: 'pm',
      days: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      },
      sort: 0
    }
  ]);

  const dayMedications = (day, period) => {
    return medications.filter((medication) => medication.period === period && medication.days[day]);
  };

  function createUpdate(medication) {
    medications.push(medication);
    console.log(medications);
  }

  return { medications, dayMedications, createUpdate };
});
