<template>
  <teleport to="body">
    <dialog ref="medicationDialog">
      <h2>Add new medication</h2>
      <form @submit.prevent="createUpdate" ref="medicationForm">
        <fieldset class="fieldset--medication">
          <legend>Medication</legend>
          <label>
            Name
            <input type="text" id="name" name="name" required>
          </label>
          <label>
            Quantity
            <input type="number" id="quantity" name="quantity" min="1" step="1">
          </label>
          <label for="dose">
            Dose (mg)
            <input type="number" id="dose" name="dose" min="1" step="1">
          </label>
        </fieldset>
        <fieldset>
          <legend>Period</legend>
          <label>
            <input type="radio" value="am" name="period" required>
            Morning
          </label>
          <label>
            <input type="radio" value="pm" name="period" required>
            Afternoon
          </label>
        </fieldset>
        <fieldset>
          <legend>Days</legend>
          <label v-for="day in daysMonday" :key="day">
            <input type="checkbox" :id="day" :name="day">
            {{ upperFirst(day) }}
          </label>
          <button type="button" @click.prevent="toggleDays = !toggleDays">
            {{ toggleDays ? 'Uncheck all days' : 'Check all days' }}
          </button>
        </fieldset>
        <div>
          <button type="submit">Add</button>
          <button type="button" @click.prevent="showDialog = false">Cancel</button>
        </div>
      </form>
    </dialog>
  </teleport>
  <button type="button" @click.prevent="showDialog = true">Add Medication</button>
</template>

<script setup>
import { ref, watch } from 'vue';
import { daysMonday } from '@/days'
import { upperFirst } from '@/helpers/strings'

const showDialog = ref(false)
const medicationDialog = ref(null)
watch(showDialog, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'visible'

  if (newVal) {
    medicationDialog.value.showModal()
  } else {
    medicationDialog.value.close()
  }
})

const toggleDays = ref(false)
const medicationForm = ref(null)
watch(toggleDays, (newVal) => {
  for (let element of medicationForm.value.elements) {
    if (element.type === 'checkbox') {
      element.checked = newVal
    }
  }
})

const emit = defineEmits(['createUpdate'])
const createUpdate = (event) => {
  const elements = event.target.elements
  const medication = {
    medicationID: '0000001',
    name: elements.name.value,
    quantity: elements.quantity.value,
    dose: elements.dose.value,
    period: elements.period.value,
    days: {
      monday: elements.monday.checked,
      tuesday: elements.tuesday.checked,
      wednesday: elements.wednesday.checked,
      thursday: elements.thursday.checked,
      friday: elements.friday.checked,
      saturday: elements.saturday.checked,
      sunday: elements.sunday.checked
    },
    sort: 0
  }
  emit('createUpdate', medication);
};
</script>

<style scoped>
dialog {
  background-color: var(--colour-back);
  border: 1px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to right, var(--colour-ui), var(--colour-b-mid));
  color: var(--colour-front);
  left: 25vw;
  padding: 0;
  top: 6rem;
  width: 50vw;
}

dialog::backdrop {
  background-color: var(--colour-backdrop);
}

h2 {
  background: linear-gradient(to right, var(--colour-ui), var(--colour-b-mid));
  color: var(--colour-back);
  font-size: 1.5rem;
  padding: 0 .5rem;
  margin: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  padding: .5rem;
}

fieldset {
  --columns: 1fr 1fr 1fr;
}

.fieldset--medication label {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}
</style>
