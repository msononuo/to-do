import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext  = createContext();

export default function UserProvider({children}) {
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      localStorage.setItem('token' ,token)
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (

  <UserContext.Provider value={{user ,setUser , token ,setToken}} >
    {children}
  </UserContext.Provider>

  )
}

export {UserContext}
