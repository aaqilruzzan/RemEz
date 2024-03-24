import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useAuthActions = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const logOut = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  // Return the logout action so it can be used by components
  return { logOut };
}
