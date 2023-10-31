import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', () => {
  const type = ref('');
  const message = ref('');
  let timeout;

  function set(newType, newMessage) {
    type.value = newType;
    message.value = newMessage;
    autoHide();
  }

  function clear() {
    type.value = '';
    message.value = '';
    clearTimeout(timeout);
  }

  function autoHide() {
    timeout = setTimeout(() => {
      clear();
    }, 5000);
  }

  return { type, message, set, clear };
});
