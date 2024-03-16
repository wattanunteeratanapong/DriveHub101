import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({
  auth: false,
  setAuth: () => {},
  handleLogout: () => {},
  role: "customer",
  setRole: () => {},
  setName: () => {},
  name: ""
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem('auth')) || false;
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem('role') || 'customer';
  });

  const [name,setName] = useState(()=>{

    return localStorage.getItem('name') || '';
  }
  );

  const handleLogout = () => {
    setRole('customer');
    setAuth(false);
    setName('');
  };


  useEffect(() => {
    // Save auth state and role to local storage whenever they change
    localStorage.setItem('auth', JSON.stringify(auth));
    localStorage.setItem('role', role);
  }, [auth, role]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleLogout, role, setRole, setName,name}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
