import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.withCredentials = true; 

  useEffect(() => {
    const checkAuth = async () => {
        try {
        const response = await axios.get("/auth/checkauth");
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
      const response = await axios.post("/auth/signup", { fullname, username, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/login", { username, password });
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
      const response = await axios.post("/auth/logout");
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
