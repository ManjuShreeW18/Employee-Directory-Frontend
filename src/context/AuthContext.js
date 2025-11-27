import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //It Runs once on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ 
            fullname:decoded.fullname,
            department:decoded.department,
            email: decoded.unique_name || decoded.name, 
            role: decoded.role,
            employeeId: decoded.employeeId 
          
        });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token'); 
      }
    }
  }, []);

  //we Call this on login
  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setUser({ 
        fullname:decoded.fullname,
        department:decoded.department,
        email: decoded.unique_name || decoded.name, 
        role: decoded.role,
        employeeId: decoded.employeeId 
      });
    } catch (error) {
      console.error("Invalid token on login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
