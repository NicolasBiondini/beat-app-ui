import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

function Layout({}: Props) {
  return (
    <main className=" w-screen m-0 flex flex-row flex-auto items-center  h-screen text-black overflow-x-hidden ">
      <Outlet />
    </main>
  );
}

export default Layout;
