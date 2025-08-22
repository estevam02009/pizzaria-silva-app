import React, { createContext, useContext, useState } from "react";

const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [client, setClient] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const updateClient = (data) => {
    setClient(data);
  };

  return (
    <ClientContext.Provider value={{ client, updateClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  return useContext(ClientContext);
}
