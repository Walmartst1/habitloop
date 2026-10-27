import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Protected({children}){
  const { user } = useAuth();
  if(!user) return <Navigate to="/login" />;
  return children;
}
function Nav(){
  const loc = useLocation();
  const { user, logout } = useAuth();
  if(!user) return null;
  const isActive = (p) => loc.pathname===p ? "bg-white text-violet-600" : "text-white/80";
  return (
    <div className="bg-violet-600 text-white p-3 flex gap-2 justify-between items-center sticky top-0 z-10">
      <div className="flex gap-2 overflow-x-auto">
        <Link to="/" className={`px-3 py-2 rounded-xl font-bold text-sm ${isActive("/")}`}>Dashboard</Link>
        <Link to="/habits" className={`px-3 py-2 rounded-xl font-bold text-sm ${isActive("/habits")}`}>Habits</Link>
        <Link to="/calendar" className={`px-3 py-2 rounded-xl font-bold text-sm ${isActive("/calendar")}`}>Calendar</Link>
        <Link to="/analytics" className={`px-3 py-2 rounded-xl font-bold text-sm ${isActive("/analytics")}`}>Analytics</Link>
        <Link to="/journal" className={`px-3 py-2 rounded-xl font-bold text-sm ${isActive("/journal")}`}>Journal</Link>
      </div>
      <button onClick={logout} className="text-xs bg-black/20 px-3 py-2 rounded-xl">Logout</button>
    </div>
  )
}
function AppRoutes(){
  return (
    <>
      <Nav/>
      <div className="min-h-screen bg-[#f8f9ff]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Protected><Dashboard /></Protected>} />
          <Route path="/habits" element={<Protected><Habits /></Protected>} />
          <Route path="/calendar" element={<Protected><Calendar /></Protected>} />
          <Route path="/analytics" element={<Protected><Analytics /></Protected>} />
          <Route path="/journal" element={<Protected><Journal /></Protected>} />
        </Routes>
      </div>
    </>
  )
}
export default function App(){
  return <BrowserRouter><AuthProvider><AppRoutes/></AuthProvider></BrowserRouter>
}