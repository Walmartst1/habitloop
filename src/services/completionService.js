import { collection, doc, setDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
export const subscribeCompletions = (uid,cb) => onSnapshot(query(collection(db,`users/${uid}/completions`)), s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))));
export const toggleCompletion = (uid,habit,dateStr,data) => setDoc(doc(db,`users/${uid}/completions/${habit.id}_${dateStr}`),{habitId:habit.id,date:dateStr,completed:data.completed,value:data.value||0,updatedAt:new Date().toISOString()},{merge:true});