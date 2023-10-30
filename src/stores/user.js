import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '@/includes/firebase';

export const useUserStore = defineStore('user', () => {
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
    // const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password);
    // await usersCollection.doc(userCred.user.uid).set({
    //   name: values.name,
    //   email: values.email
    // });
    // await userCred.user.updateProfile({
    //   displayName: values.name
    // });
    // userLoggedIn.value = true;
  }

  async function authenticate(values) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.log(error);
    }
  }

  async function logOut() {
    await signOut(auth);
    router.push('/');
  }

  return { loggedInUser, isLoggedIn, weekStart, register, authenticate, logOut };
});
