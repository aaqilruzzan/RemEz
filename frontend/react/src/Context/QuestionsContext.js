import { createContext, useContext, useState } from "react";

const QuestionsContext = createContext();

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState({});

  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  return useContext(QuestionsContext);
}
