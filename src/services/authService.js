import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
export const signup = async (name,email,pass) => { const c=await createUserWithEmailAndPassword(auth,email,pass); await updateProfile(c.user,{displayName:name}); return c.user; };
export const login = (e,p) => signInWithEmailAndPassword(auth,e,p);
export const logout = () => signOut(auth);
export const resetPassword = (e) => sendPasswordResetEmail(auth,e);