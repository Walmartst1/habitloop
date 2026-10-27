export default function Calendar(){
  const days = Array.from({length:30},(_,i)=>i+1);
  return <div className="p-6 max-w-3xl mx-auto">
    <h1 className="text-3xl font-black">Calendar 📅</h1>
    <p className="text-gray-500 mt-1">October 2026</p>
    <div className="bg-white p-5 rounded-2xl shadow border mt-6">
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><p key={d} className="font-bold text-gray-400 py-2">{d}</p>)}
        {days.map(d=><div key={d} className={`p-3 rounded-xl ${d===27?'bg-violet-600 text-white font-bold': 'bg-gray-50'}`}>{d}</div>)}
      </div>
    </div>
  </div>
}