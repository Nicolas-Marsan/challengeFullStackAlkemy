import { createContext } from "react";
import { useState } from "react";

export const UsuarioContext =  createContext();

const dataFirst = {
    mail:"inexistente",
    id: 0
}

export const UserProvider = ({children}) => {

    const [userGlobal, setUserGlobal] = useState('null');

    return (
        <UsuarioContext.Provider value = {{
            userGlobal,
            setUserGlobal
        }}>
            {children}
        </UsuarioContext.Provider>
    )


}