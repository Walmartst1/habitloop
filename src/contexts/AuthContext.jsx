import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
  const [user,setUser] = useState(()=>{
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  });

  useEffect(()=>{
    if(user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  },[user]);

  const getUsers = () => {
    const s = localStorage.getItem("all_users");
    return s ? JSON.parse(s) : [];
  }

  const signup = (email, password) => {
    const users = getUsers();
    const exists = users.find(u => u.email === email);
    if(exists) throw new Error("User already exists! Please Login");
    const newUsers = [...users, {email, password}];
    localStorage.setItem("all_users", JSON.stringify(newUsers));
    setUser({email});
  }

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if(!found) throw new Error("Email or password not found, please Sign up!");
    setUser({email});
  }

  const logout = ()=> setUser(null);

  return <AuthContext.Provider value={{user, login, signup, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext);