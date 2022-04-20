import NavMenu from "./NavMenu";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavMenuMobile from "./NavMenuMobile";

type Props = {
  children: JSX.Element;
};

function DashboardContainer({ children }: Props) {
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <section
      id="App"
      className="w-full h-full flex justify-center items-center overflow-x-hidden "
    >
      <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-6 ">
        <div className="bg-indigo-50 lg:flex lg:flex-col lg:justify-center border-r-2 border-gray-300 scroll-y-hidden">
          <NavMenu />
          <div
            onClick={signOut}
            className="hidden lg:block self-start pl-10 text-lg font-semibold text-indigo-800 hover:text-indigo-500 transition-all cursor-pointer"
          >
            Sign Out
          </div>
          <NavMenuMobile />
        </div>
        <div className="col-span-6 lg:col-span-5">
          <Toaster position="top-right" reverseOrder={false} />

          {children}
        </div>
      </div>
    </section>
  );
}

export default DashboardContainer;
