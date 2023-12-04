import React from 'react'
import { useState } from 'react';
import { useContext,createContext } from "react";
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [selected,setSelected] = useState(
        {
            user : null,
            isOpen : false
        }
    );


    const SelectUser = (payload) => {
        setSelected(
            {
                user : payload,
                isOpen : true
            }
        )
    }

    const RestUser = () => {
        setSelected(
            {
                user : null,
                isOpen : false
            }
        )
    }

    return <UserContext.Provider value={{selected,SelectUser,RestUser}}>
        { children }
    </UserContext.Provider>
}

export const useUser = () => {
    return useContext(UserContext)
}
