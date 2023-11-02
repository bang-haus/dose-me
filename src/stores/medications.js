import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  addDoc,
  setDoc
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '@/includes/firebase';
import { useAlertStore } from '@/stores/alert';

export const useMedicationsStore = defineStore('medications', () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const alert = useAlertStore();
  let unsubscribe;

  // 201974041297: {
  //   uid: '21321221122',
  //   name: 'Leflunomide',
  //   quantity: 1,
  //   dose: 20,
  //   period: 'am',
  //   days: {
  //     monday: true,
  //     tuesday: true,
  //     wednesday: true,
  //     thursday: true,
  //     friday: true,
  //     saturday: true,
  //     sunday: true
  //   },
  //   sort: 0
  // }

  const medications = reactive(new Map());

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const q = query(collection(db, 'medications'), where('uid', '==', user.uid));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added' || change.type === 'modified') {
            medications.set(change.doc.id, { ...change.doc.data() });
          }

          if (change.type === 'removed') {
            medications.delete(change.doc.id);
          }
        });
      });
    }
  });

  function getMedication(docid) {
    return medications.get(docid);
  }

  const dayMedications = (day, period) => {
    return Array.from(medications).filter(
      (medication) => medication.period === period && medication.days[day]
    );
  };

  async function createUpdate({ medication, docID }) {
    if (docID) {
      try {
        await setDoc(doc(db, 'medications', docID), medication);
      } catch (error) {
        console.log(error);
        alert.set('error', error.code);

        return false;
      }

      alert.set('success', 'Successfully updated!');
      editing.value = '';

      return true;
    }

    try {
      await addDoc(collection(db, 'medications'), medication);
    } catch (error) {
      console.log(error);
      alert.set('error', error.code);

      return false;
    }

    alert.set('success', 'Successfully created!');

    return true;
  }

  const editing = ref('');

  function edit(docid) {
    editing.value = docid;
  }

  function unsub() {
    unsubscribe();
  }

  return { editing, edit, medications, getMedication, dayMedications, createUpdate, unsub };
});
