import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setUser({});
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData || {});
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    await API.post("/auth/logout").catch(() => {});
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}