import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard(){
  const { user } = useAuth();
  const [habits,setHabits]=useState([]);

  useEffect(()=>{
    const saved = localStorage.getItem("habits");
    if(saved) setHabits(JSON.parse(saved));
  },[]);

  const done = habits.filter(h=>h.done).length;
  const pct = habits.length ? Math.round((done/habits.length)*100) : 0;
  
  const firstName = user?.name?.split(' ')[0] || user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Welcome back, {firstName}! 👋</h1>
      <p className="text-gray-500 mt-1">You have {habits.length} habits tracked</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-500">Total Habits</p>
          <p className="text-2xl font-bold mt-2">{habits.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold mt-2">{done}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-500">Progress</p>
          <p className="text-2xl font-bold mt-2">{pct}%</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow border mt-6">
        <h2 className="font-semibold">Your Habits</h2>
        <div className="mt-4">
          {habits.length === 0 ? (
            <div>
              <p className="text-gray-500">No habits yet.</p>
              <Link to="/habits" className="text-blue-600 font-medium">Create your first habit →</Link>
            </div>
          ) : (
            habits.map((h,i)=>(
              <div key={i} className="flex justify-between py-2 border-b">
                <span>{h.name || h.title}</span>
                <span className={h.done ? "text-green-600" : "text-gray-400"}>{h.done ? "Done ✓" : "Pending"}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}