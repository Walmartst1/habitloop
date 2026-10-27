import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
export const subscribeSettings = (uid,cb) => onSnapshot(doc(db,`users/${uid}/settings/preferences`),s=>cb(s.exists()?s.data():{theme:'light'}));
export const saveSettings = (uid,s) => setDoc(doc(db,`users/${uid}/settings/preferences`),s,{merge:true});