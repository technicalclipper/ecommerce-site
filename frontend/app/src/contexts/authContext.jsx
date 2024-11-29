import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  axios.defaults.baseURL = "http://localhost:4000/auth";
  axios.defaults.headers.common["Content-Type"] = "application/json";


  useEffect(() => {
    const checkAuth = async () => {
        try {
        const response = await axios.get("/checkauth");
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data.user); 
        } 
        else {  
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const signup = async (fullname, username, password) => {
    try {
      const response = await axios.post("/signup", { fullname, username, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post("/login", { username, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
