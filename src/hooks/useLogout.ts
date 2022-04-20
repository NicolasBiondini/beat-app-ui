import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { toogleSetAuth } = useAuth();

  const logout = async () => {
    toogleSetAuth({ itsAuth: false, accessToken: "", person_uid: "" });

    try {
      const response = await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
