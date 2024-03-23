
import { useContext } from "react"
// Correct this in useAuthContext.js
import { AuthContext } from '../Context/AuthContext';


export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}