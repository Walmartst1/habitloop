import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
export default function ProtectedRoute({children}){ const [u,setU]=useState(undefined); useEffect(()=>onAuthStateChanged(auth,setU),[]); if(u===undefined) return <div className="p-10 text-center">Loading...</div>; if(!u) return <Navigate to="/login" />; return children; }