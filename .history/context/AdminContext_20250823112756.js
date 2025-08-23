import React, { createContext, useState, useContext } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    // Função de login admin simples
    const loginAdmin = (password) => {
        if (password === "123456") { // senha fixa para exemplo
            setIsAdmin(true);
            return true;
        } else {
            return false;
        }
    };

    const logoutAdmin = () => {
        setIsAdmin(false);
    };

    return (
        <AdminContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
