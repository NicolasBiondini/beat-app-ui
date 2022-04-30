import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import DashboardContainer from "./DashboardContainer";

function PersistSignIn() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  // const [refreshTime, setRefreshTime] = useState(false);
  const [locationRefresh, setLocationRefresh] = useState(false);
  //const [time, setTime] = useState(0);

  let location = useLocation();

  useEffect(() => {
    setLocationRefresh(true);
  }, [location]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const verifyRefreshToken = async () => {
      try {
        setLocationRefresh(false);
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken || locationRefresh
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [locationRefresh]);

  /**
  useEffect(() => {
    setTimeout(() => {
      setRefreshTime(true);
      setTime(time + 1);
      setTimeout(() => {
        setRefreshTime(!refreshTime);
      }, 200);
    }, 840000);
  }, [time]);
 */
  // 840000 14 minutes on miliseconds

  return (
    <>
      {isLoading ? (
        <DashboardContainer>
          <div className="max-h-screen min-h-screen overflow-y-scroll p-12 lg:p-20 bg-indigo-100 flex flex-col gap-10"></div>
        </DashboardContainer>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default PersistSignIn;
