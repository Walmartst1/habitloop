import { NavLink } from "react-router-dom";
import { logout } from "../services/authService";

const links = [
  { to: "/", label: "Dashboard", icon: "🏠" },
  { to: "/habits", label: "Habits", icon: "📊" },
  { to: "/analytics", label: "Analytics", icon: "📈" },
  { to: "/journal", label: "Journal", icon: "📓" },
  { to: "/reminders", label: "Reminders", icon: "🔔" },
  { to: "/accountability", label: "Accountability", icon: "👥", badge: "Demo" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-[260px] bg-white border-r flex-col fixed h-screen z-20">
      <div className="p-6">
        <h1 className="text-2xl font-black flex items-center gap-2">
          <span className="bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">H</span>
          HabitLoop
        </h1>
        <p className="text-xs text-gray-400 ml-10 -mt-1">Better Habits. A Brighter You.</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map((x) => (
          <NavLink
            key={x.to}
            to={x.to}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition ${
                isActive ? "bg-violet-50 text-violet-700 font-bold" : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <span>{x.icon}</span> {x.label}
            </span>
            {x.badge && <span className="text-[10px] border border-violet-300 text-violet-600 px-2 py-0.5 rounded-md">Demo</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <div className="bg-violet-50 rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">👥</div>
          <p className="text-sm font-bold">Accountability Demo</p>
          <p className="text-xs text-gray-500 mt-1">Invite partners, join challenges and see leaderboards!</p>
          <button className="mt-3 w-full bg-violet-600 text-white text-sm py-2 rounded-xl">Explore Demo</button>
        </div>
        <div className="mt-6 text-center">
          <div className="text-green-500 text-xl">🌿</div>
          <p className="text-xs text-gray-500 italic mt-2">Small steps<br/>every day lead to<br/>big results.</p>
        </div>
        <p className="text-[10px] text-gray-400 mt-8">HabitLoop v1.0.0</p>
      </div>
      
      <button onClick={logout} className="m-3 px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-xl text-left">Logout</button>
    </aside>
  );
}