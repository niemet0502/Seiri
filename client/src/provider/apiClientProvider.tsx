import React, { createContext, useState } from "react";
import { Client } from "../utils/Client";

interface ApiClientContextValue {
  apiClient: Client;
}

export const ApiClientContext = createContext<ApiClientContextValue>(
  {} as ApiClientContextValue
);

export const ApiClientProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [apiClient] = useState(new Client());

  return (
    <ApiClientContext.Provider value={{ apiClient }}>
      {children}
    </ApiClientContext.Provider>
  );
};
