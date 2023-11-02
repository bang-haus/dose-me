<template>
  <teleport to="body">
    <dialog ref="medicationDialog">
      <h2>Add new medication</h2>
      <form @submit.prevent="createUpdate" ref="medicationForm">
        <input type="hidden" id="docID" name="docID" :value="medications.editing">
        <fieldset class="fieldset--medication" :disabled="processing === 'processing'">
          <legend>Medication</legend>
          <label>
            Name
            <input type="text" id="name" name="name" required :value="currentMedication && currentMedication.name">
          </label>
          <label>
            Quantity
            <input type="number" id="quantity" name="quantity" min="1" step="1" :value="currentMedication?.quantity">
          </label>
          <label for="dose">
            Dose (mg)
            <input type="number" id="dose" name="dose" min="1" step="1" :value="currentMedication?.dose">
          </label>
        </fieldset>
        <fieldset :disabled="processing === 'processing'">
          <legend>Period</legend>
          <label>
            <input type="radio" value="am" name="period" required :checked="currentMedication?.period === 'am'">
            Morning
          </label>
          <label>
            <input type="radio" value="pm" name="period" required :checked="currentMedication?.period === 'pm'">
            Afternoon
          </label>
        </fieldset>
        <fieldset :disabled="processing === 'processing'">
          <legend>Days</legend>
          <day-checkboxes :meddays="currentMedication?.days" />
        </fieldset>
        <fieldset :disabled="processing === 'processing'">
          <button type="submit">{{ addOrUpdate }}</button>
          <button type="button" @click.prevent="cancel">Cancel</button>
          <button v-if="medications.editing">Delete</button>
        </fieldset>
      </form>
    </dialog>
  </teleport>
  <button type="button" @click.prevent="showDialog = true">Add Medication</button>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useMedicationsStore } from '@/stores/medications';
import { useUserStore } from '@/stores/user';
import DayCheckboxes from '@/components/DayCheckboxes.vue';

const medications = useMedicationsStore();
const user = useUserStore();

const showDialog = ref(false);
const medicationDialog = ref(null);
const currentMedication = ref(null);

watch(showDialog, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'visible'

  if (newVal) {
    medicationDialog.value.showModal();
  } else {
    medicationDialog.value.close();
  }
});

const medicationForm = ref(null);

const props = defineProps({
  processing: String,
  docid: String,
});

const emit = defineEmits(['createUpdate']);

const createUpdate = (event) => {
  const elements = event.target.elements;
  const docID = elements.docID.value;
  const medication = {
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
    sort: 0,
    uid: user.loggedInUser.uid
  };

  emit('createUpdate', { medication, docID });
};

watch(() => props.processing, (newVal) => {
  if (newVal === 'success') {
    currentMedication.value = null;
    medicationForm.value.reset();
    showDialog.value = false;
  }
});

const addOrUpdate = computed(() => {
  return props.docid ? 'Update' : 'Add';
});

watch(() => props.docid, (newDocid) => {
  if (newDocid) {
    showDialog.value = true;
    currentMedication.value = medications.getMedication(newDocid);
  } else {
    currentMedication.value = null;
  }
});

function cancel() {
  showDialog.value = false;
  medicationForm.value.reset();
  medications.edit('');
}
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
