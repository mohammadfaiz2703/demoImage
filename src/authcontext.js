import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // true = login | false = signup
  const [isLogin, setIsLogin] = useState(false);

  const toggleAuth = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ isLogin, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
