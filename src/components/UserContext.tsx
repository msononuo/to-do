import { createContext, useEffect, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  id: number;
  username: string;
  email: string;
};

type UserContextType = {
  user : User | null ,
  setUser : React.Dispatch<React.SetStateAction<User | null>>
  token : string | null
  setToken : React.Dispatch<React.SetStateAction<string | null>>
}

const UserContext  = createContext<UserContextType | null>(null);

export default function UserProvider({children} :{children : ReactNode}) {
  const [user , setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      localStorage.setItem('token' ,token)
      console.log(123)
      console.log(decoded)
    } else {
      localStorage.removeItem("token");
      setUser(null)
    }
  }, [token]);

  return (

  <UserContext.Provider value={{user ,setUser , token ,setToken}} >
    {children}
  </UserContext.Provider>

  )
}

export {UserContext}
