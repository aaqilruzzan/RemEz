import { createContext, useContext, useState } from "react";

const AnswersContext = createContext();

export function AnswersProvider({ children }) {
  const [answers, setAnswers] = useState({});

  return (
    <AnswersContext.Provider value={{ answers, setAnswers }}>
      {children}
    </AnswersContext.Provider>
  );
}

export function useAnswers() {
  return useContext(AnswersContext);
}
