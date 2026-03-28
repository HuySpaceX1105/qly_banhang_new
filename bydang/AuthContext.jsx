import { createContext, useContext, useState, useEffect } from "react";
import { loginService, logoutService, refreshTokenService, registerService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (username, password, remember) => {
    try {
      const authResponse = await loginService(username, password);
      setAuth(authResponse);
      
      if (remember) {
        localStorage.setItem("auth", JSON.stringify(authResponse));
      } else {
        localStorage.removeItem("auth");
      }
      return authResponse;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setAuth(null);
      localStorage.removeItem("auth");
    }
  };

  const initAuth = async () => {
    const savedAuth = localStorage.getItem("auth");
    if (!savedAuth) {
      setLoading(false);
      return;
    }
    
    try {
      setAuth(JSON.parse(savedAuth));
      const res = await refreshTokenService();
      setAuth(res);
      localStorage.setItem("auth", JSON.stringify(res));
    } catch (error) {
      console.log("Refresh token failed", error.message);
      setAuth(null);
      localStorage.removeItem("auth");
    } finally {
      setLoading(false);
    }
  };


  const register = async (data, shouldAutoLogin = false) => {
    try {
      
      const response = await registerService(data);

  
      if (shouldAutoLogin) {
        const authResponse = await loginService(data.username, data.password);
        setAuth(authResponse);
        localStorage.setItem("auth", JSON.stringify(authResponse));
        return authResponse;
      }

     
    } catch (error) {
      throw error; 
    }
  };

  return (
    <AuthContext.Provider value={{ auth, loading, setAuth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
