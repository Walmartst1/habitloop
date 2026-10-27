import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
export const subscribeHabits = (uid,cb) => { const q=query(collection(db,`users/${uid}/habits`)); return onSnapshot(q,s=>cb(s.docs.map(d=>({id:d.id,...d.data()})))); };
export const createHabit = (uid,h) => addDoc(collection(db,`users/${uid}/habits`),{...h,createdAt:serverTimestamp(),status:'active'});
export const updateHabit = (uid,id,d) => updateDoc(doc(db,`users/${uid}/habits/${id}`),d);
export const deleteHabit = (uid,id) => deleteDoc(doc(db,`users/${uid}/habits/${id}`));