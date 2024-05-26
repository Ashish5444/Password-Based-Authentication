import { useState, useEffect, useContext, createContext } from "react";
import checkSession from "../helper/checkSession";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        userId: null
    });

    useEffect(() => {
        setAuth({
            ...auth ,
            userId : localStorage.getItem("auth")
        })
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
