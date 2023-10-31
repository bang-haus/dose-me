import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import app from '@/includes/firebase';
import { useAlertStore } from '@/stores/alert';

export const useUserStore = defineStore('user', () => {
  const alert = useAlertStore();

  const loggedInUser = reactive({ email: '', displayName: '', uid: '' });
  const weekStart = ref('monday');
  const auth = getAuth(app);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    const appUser = {
      uid: '',
      email: '',
      displayName: ''
    };

    if (user) {
      Object.assign(appUser, { uid: user.uid, email: user.email, displayName: user.displayName });
      router.push('/week');
    }

    Object.assign(loggedInUser, appUser);
  });

  const isLoggedIn = computed(() => {
    return !!loggedInUser.uid;
  });

  async function register(values) {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.log('register error');
      alert.set('error', error.code);

      return;
    }

    alert('success', 'Successfully registered!');
  }

  async function authenticate(values) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.log('authentication error');
      alert.set('error', error.code);

      return;
    }

    alert.set('success', 'Successfully logged in!');
  }

  async function logOut() {
    await signOut(auth);
    alert.set('success', 'Successfully logged out!');
    router.push('/');
  }

  return { loggedInUser, isLoggedIn, weekStart, register, authenticate, logOut };
});
