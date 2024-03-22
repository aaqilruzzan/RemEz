import { createContext, useContext, useState } from "react";

const UploadContext = createContext();

export function UploadProvider({ children }) {
  const [uploadedPdf, setUploadedPdf] = useState(false);

  return (
    <UploadContext.Provider value={{ uploadedPdf, setUploadedPdf }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  return useContext(UploadContext);
}
