import useAuth from "./useAuth";
import axios from "../api/axios";

function useRefreshToken() {
  const { toogleSetAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    toogleSetAuth({
      itsAuth: true,
      accessToken: response.data.token,
      person_uid: response.data.person_uid,
    });
    return response.data.token;
  };

  return refresh;
}

export default useRefreshToken;
