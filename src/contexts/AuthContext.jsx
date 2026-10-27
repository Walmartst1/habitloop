import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("habitloop_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const getUsers = () => {
    const s = localStorage.getItem("all_users");
    return s ? JSON.parse(s) : [];
  };

  const signup = (email, password, name) => {
    const users = getUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) throw new Error("User already exists! Please Login");
    const newUsers = [...users, { email, password, name }];
    localStorage.setItem("all_users", JSON.stringify(newUsers));
    const newUser = { email, name: name || email.split('@')[0] };
    setUser(newUser);
    localStorage.setItem("habitloop_user", JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const loggedUser = { email: found.email, name: found.name || found.email.split('@')[0] };
    setUser(loggedUser);
    localStorage.setItem("habitloop_user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("habitloop_user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}