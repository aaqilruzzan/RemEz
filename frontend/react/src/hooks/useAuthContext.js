
import { useContext } from "react"
// Correct this in useAuthContext.js
import { AuthContext } from '../context/AuthContext';


export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}