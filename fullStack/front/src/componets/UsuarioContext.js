import { createContext } from "react";
import { useState } from "react";

export const UsuarioContext = createContext();

export const UserProvider = ({ children }) => {
  const [userGlobal, setUserGlobal] = useState("null");

  return (
    <UsuarioContext.Provider
      value={{
        userGlobal,
        setUserGlobal,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
