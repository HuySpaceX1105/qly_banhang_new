import { createContext, useContext, useState, useEffect } from "react";
import { loginService, logoutService, refreshTokenService } from "../services/authService";
import { registerService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null); // 👈 state auth
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       initAuth();
    }, []);


    const login = async (username, password, remember) => {
        const authResponse = await loginService(username, password);

        setAuth(authResponse);
        if (remember) localStorage.setItem("auth", JSON.stringify(authResponse));
        else localStorage.removeItem("auth");
    };

    
    const logout = async () => {
        try {
            await logoutService();
        } catch (error) {
            console.log(error);
        }
        
        setAuth(null);
        localStorage.removeItem("auth");
    };

    const initAuth = async () => {
        const auth = localStorage.getItem("auth");
        if (!auth) {
            setLoading(false);
            return; // chưa login → không gọi refresh token
        }
        setAuth(JSON.parse(auth));

        try {
            const res = await refreshTokenService();
            setAuth(res);
            localStorage.setItem("auth", JSON.stringify(res));
        } catch (error) {
            console.log("Refresh token failed", error.message);
            setAuth(null);
            localStorage.removeItem("auth");
        }
        setLoading(false);
    }

    const register = async (data, remember) => {
        // 1. gọi register
        await registerService(data);

        // 2. auto login sau khi register
        const authResponse = await loginService(data.username, data.password);

        setAuth(authResponse);

        if (remember) {
            localStorage.setItem("auth", JSON.stringify(authResponse));
        } else {
            localStorage.removeItem("auth");
        }
    };

    return (
        <AuthContext.Provider value={{ auth, loading, setAuth, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);