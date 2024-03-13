import { createContext, useContext, useState } from "react";

const uploadContext = createContext();

export function uploadProvider({ children }) {
  const [upload, setUpload] = useState(false);

  return (
    <uploadContext.Provider value={{ upload, setUpload }}>
      {children}
    </uploadContext.Provider>
  );
}

export function useUpload() {
  return useContext(uploadContext);
}
