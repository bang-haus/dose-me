import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', () => {
  const type = ref('');
  const message = ref('');

  function set(newType, newMessage) {
    type.value = newType;
    message.value = newMessage;
    console.log(newType, newMessage)
  }

  function clear() {
    type.value = '';
    message.value = '';
  }

  return { type, message, set, clear };
});
