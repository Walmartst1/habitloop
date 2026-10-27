import { useState, useEffect } from "react";
export default function Habits(){
  const [habits,setHabits]=useState(()=>{ const s=localStorage.getItem("habits"); return s? JSON.parse(s): []; });
  const [name,setName]=useState("");
  useEffect(()=>{ localStorage.setItem("habits", JSON.stringify(habits)); },[habits]);
  const add=()=>{ if(!name) return; setHabits([...habits,{id:Date.now(),name,done:false}]); setName(""); };
  const toggle=(id)=> setHabits(habits.map(h=>h.id===id?{...h,done:!h.done}:h));
  const del=(id)=> setHabits(habits.filter(h=>h.id!==id));
  return <div className="p-6 max-w-2xl mx-auto">
    <h1 className="text-3xl font-black">My Habits 💪</h1>
    <div className="bg-white p-4 rounded-2xl shadow border mt-6 flex gap-2">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="New habit..." className="flex-1 border p-3 rounded-xl"/>
      <button onClick={add} className="bg-violet-600 text-white px-6 rounded-xl font-bold">Add</button>
    </div>
    <div className="grid gap-3 mt-4">
      {habits.map(h=><div key={h.id} className="bg-white p-4 rounded-xl shadow border flex justify-between items-center">
        <span className={h.done?"line-through text-gray-400":"font-bold"}>{h.name}</span>
        <div className="flex gap-2">
          <button onClick={()=>toggle(h.id)} className={`px-3 py-1 rounded-lg text-sm font-bold ${h.done?"bg-green-100 text-green-700":"bg-gray-100"}`}>{h.done?"Done":"Do"}</button>
          <button onClick={()=>del(h.id)} className="text-red-500 text-sm">X</button>
        </div>
      </div>)}
    </div>
  </div>
}