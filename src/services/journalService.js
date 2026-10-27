import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
export const subscribeJournal = (uid,cb) => onSnapshot(query(collection(db,`users/${uid}/journal`),orderBy("date","desc")),s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))));
export const createEntry = (uid,e) => addDoc(collection(db,`users/${uid}/journal`),{...e,createdAt:serverTimestamp()});
export const updateEntry = (uid,id,d) => updateDoc(doc(db,`users/${uid}/journal/${id}`),d);
export const deleteEntry = (uid,id) => deleteDoc(doc(db,`users/${uid}/journal/${id}`));