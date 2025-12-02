import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Runs once on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) { // Check if token exists
      try {
        const decoded = jwtDecode(token); // Decode JWT
        setUser({ 
            fullname:decoded.fullname,
            department:decoded.department,
            email: decoded.unique_name || decoded.name, 
            role: decoded.role,
            employeeId: decoded.employeeId 
        });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token'); // Remove invalid token
      }
    }
  }, []);

  // Call this on login
  const login = (token) => {
    localStorage.setItem('token', token); // Save token
    try {
      const decoded = jwtDecode(token); // Decode token
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
    localStorage.removeItem('token'); // Remove token on logout
    setUser(null); // Clear user
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
