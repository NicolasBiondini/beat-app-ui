import { useState } from "react";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { MenuAlt3Icon } from "@heroicons/react/outline";
type Props = {};

function NavMenuMobile({}: Props) {
  const [toogleOpen, setToogleOpen] = useState(true);

  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <nav className=" w-screen bg-indigo-100 lg:hidden flex flex-col justify-center items-center gap-6 py-5 overflow-y-hidden scroll-y-hidden">
      <div
        className="cursor-pointer self-end pr-8"
        onClick={() => setToogleOpen(!toogleOpen)}
      >
        <MenuAlt3Icon className="h-8 w-8" />
      </div>
      {toogleOpen ? null : (
        <ul
          onClick={() => setToogleOpen(true)}
          className="flex flex-col items-center gap-6"
        >
          <Link
            className={`w-24px h-24px p-4 py-4 text-base   font-normal   hover:bg-indigo-100 transition-all hover:text-indigo-800`}
            to={"/home"}
          >
            Home{" "}
          </Link>{" "}
          <Link
            className={`  min-w-48 p-4 py-4 text-base   font-normal   hover:bg-indigo-100 transition-all hover:text-indigo-800`}
            to={"/tasks"}
          >
            Tasks{" "}
          </Link>{" "}
          <Link
            className={`min-w-48 p-4 py-4 text-base   font-normal   hover:bg-indigo-100 transition-all hover:text-indigo-800`}
            to={"/Dashboard"}
          >
            Dashboard{" "}
          </Link>{" "}
          <Link
            className={` min-w-48 p-4 py-4 text-base   font-normal   hover:bg-indigo-100 transition-all hover:text-indigo-800`}
            to={"/settings"}
          >
            Settings{" "}
          </Link>{" "}
          <div
            onClick={signOut}
            className="  text-lg font-semibold text-indigo-800 hover:text-indigo-500 transition-all cursor-pointer"
          >
            Sign Out
          </div>
        </ul>
      )}
    </nav>
  );
}

export default NavMenuMobile;
