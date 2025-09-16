import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../services/auth'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)
 
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      const userData = localStorage.getItem('user')
      if(userData) {
        setUser(JSON.parse(userData))
      }
    }
    setLoading(false)
  }, [])
  
  const login = async (email, password) => {
    const response = await auth.login(email, password);
    const { token, ...userData } = response; // Extract token, rest is user data
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    return response.data;
  };
  
  const logout = () => {
    auth.logout();
    localStorage.removeItem('user');
    setUser(null);
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;