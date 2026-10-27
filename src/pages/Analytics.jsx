import { useState, useEffect } from "react";
export default function Analytics(){
  const [habits,setHabits]=useState([]);
  useEffect(()=>{ const s=localStorage.getItem("habits"); if(s) setHabits(JSON.parse(s)); },[]);
  const done=habits.filter(h=>h.done).length;
  return <div className="p-6 max-w-3xl mx-auto">
    <h1 className="text-3xl font-black">Analytics 📊</h1>
    <div className="bg-white p-6 rounded-2xl shadow border mt-6"><h2 className="font-bold">Streak</h2><p className="text-5xl font-black mt-3">🔥 {done} day</p></div>
    <div className="bg-white p-6 rounded-2xl shadow border mt-4"><h2 className="font-bold">Breakdown</h2><div className="mt-4 space-y-2"><div className="flex justify-between"><span>Completed</span><span className="font-bold text-green-600">{done}</span></div><div className="flex justify-between"><span>Pending</span><span className="font-bold text-orange-500">{habits.length-done}</span></div><div className="flex justify-between"><span>Total</span><span className="font-bold">{habits.length}</span></div></div></div>
  </div>
}