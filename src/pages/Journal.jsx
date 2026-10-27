import { useState, useEffect } from "react";
export default function Journal(){
  const [notes,setNotes]=useState(()=>{ const s=localStorage.getItem("journal"); return s? JSON.parse(s):[] });
  const [text,setText]=useState("");
  useEffect(()=>{ localStorage.setItem("journal", JSON.stringify(notes)); },[notes]);
  const add=()=>{ if(!text) return; setNotes([{id:Date.now(),text,date:new Date().toLocaleDateString()},...notes]); setText(""); }
  return <div className="p-6 max-w-3xl mx-auto">
    <h1 className="text-3xl font-black">Journal 📝</h1>
    <div className="bg-white p-4 rounded-2xl shadow border mt-6 flex gap-2">
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="How was your day?" className="flex-1 border p-3 rounded-xl"/>
      <button onClick={add} className="bg-violet-600 text-white px-6 rounded-xl font-bold">Add</button>
    </div>
    <div className="grid gap-3 mt-4">
      {notes.map(n=><div key={n.id} className="bg-white p-4 rounded-xl shadow border"><p className="text-sm text-gray-400">{n.date}</p><p className="mt-1">{n.text}</p></div>)}
    </div>
  </div>
}