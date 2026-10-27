import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
export default function Login(){
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const handle=(e)=>{
    e.preventDefault();
    if(!email || !pass) return alert("Fill all fields");
    try{
      login(email, pass);
      nav("/");
    } catch(err){
      alert(err.message);
    }
  }
  return <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] p-4">
    <form onSubmit={handle} className="bg-white p-8 rounded-2xl shadow w-full max-w-md border">
      <h1 className="text-3xl font-black">Habit<span className="text-violet-600">Loop</span></h1>
      <p className="text-gray-500 text-sm mt-1 mb-6">Login to continue</p>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-3 rounded-xl mb-3"/>
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" className="w-full border p-3 rounded-xl mb-4"/>
      <button className="w-full bg-violet-600 text-white p-3 rounded-xl font-bold">Login</button>
      <p className="text-sm mt-4 text-center">No account? <Link to="/signup" className="text-violet-600 font-bold">Sign up</Link></p>
    </form>
  </div>
}