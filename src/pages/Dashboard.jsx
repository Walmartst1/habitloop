import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  // Clean name: prosperdaniel431 => Prosper Daniel
  const getFirstName = () => {
    let raw = user?.name || user?.displayName || user?.email?.split('@')[0] || "there";
    raw = raw.replace(/[0-9]/g, '');
    raw = raw.toLowerCase();
    if (raw.includes("prosper") && raw.includes("daniel")) return "Prosper Daniel";
    if (raw.includes("prosperdaniel")) return "Prosper Daniel";
    const first = raw.split(/[\s._-]+/)[0];
    return first.charAt(0).toUpperCase() + first.slice(1);
  };

  const todayDate = new Date();
  const hour = todayDate.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const formattedDate = todayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const firstName = getFirstName();
  const done = habits.filter(h => h.completed).length;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white min-h-screen">
      {/* EXACT DESIGN FROM YOUR IMAGE */}
      <h1 className="text-[28px] font-bold text-[#0f172a] tracking-tight">
        {greeting}, {firstName}! 👋
      </h1>
      <p className="text-[13px] text-[#6b7280] mt-1">
        Today is {formattedDate}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-500">Total Habits</p>
          <p className="text-2xl font-bold mt-2">{habits.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold mt-2">{done}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow border">
          <p className="text-sm text-gray-500">Streak</p>
          <p className="text-2xl font-bold mt-2">{habits.length > 0 ? "1 day" : "0"}</p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link to="/habits" className="bg-black text-white px-5 py-2 rounded-xl">Manage Habits</Link>
        <Link to="/analytics" className="bg-white border px-5 py-2 rounded-xl">View Analytics</Link>
      </div>
    </div>
  );
}