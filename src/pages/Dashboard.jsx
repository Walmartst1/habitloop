import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Dashboard(){
  const [habits,setHabits]=useState([]);
  useEffect(()=>{ const saved = localStorage.getItem("habits"); if(saved) setHabits(JSON.parse(saved)); },[]);
  const done = habits.filter(h=>h.done).length;
  const pct = habits.length ? Math.round((done/habits.length)*100) : 0;
  return <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-black">Welcome back! 👋</h1>
    <p className="text-gray-500 mt-1">You have {habits.length} habits</p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      <div className="bg-white p-5 rounded-2xl shadow border"><p className="text-sm text-gray-500">Total Habits</p><p className="text-3xl font-black mt-1">{habits.length}</p></div>
      <div className="bg-white p-5 rounded-2xl shadow border"><p className="text-sm text-gray-500">Completed</p><p className="text-3xl font-black mt-1 text-green-600">{done}</p></div>
      <div className="bg-white p-5 rounded-2xl shadow border"><p className="text-sm text-gray-500">Progress</p><p className="text-3xl font-black mt-1 text-violet-600">{pct}%</p></div>
    </div>
    <div className="bg-white p-5 rounded-2xl shadow border mt-6">
      <div className="flex justify-between items-center"><h2 className="font-bold">Today's Progress</h2><Link to="/habits" className="text-violet-600 text-sm font-bold">View All</Link></div>
      <div className="w-full bg-gray-100 h-4 rounded-full mt-3 overflow-hidden"><div className="bg-violet-600 h-4 rounded-full" style={{width:`${pct}%`}}></div></div>
      <p className="text-sm text-gray-500 mt-2">{done} of {habits.length} done</p>
    </div>
  </div>
}