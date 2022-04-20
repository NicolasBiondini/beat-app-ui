import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  url: string;
  itemName: string;
  icon: JSX.Element;
};

function NavButton({ url, itemName, icon }: Props) {
  return (
    <Link
      className={` ${
        useLocation().pathname === url &&
        "bg-indigo-100 border-indigo-700 text-indigo-800"
      } min-w-full pl-4 py-4 text-base flex flex-row gap-8 items-center  font-normal 2xl:text-xl 2xl:pl-10 2xl:pr-15 2xl:py-4  border-l-4  hover:bg-indigo-100 hover:border-indigo-700 transition-all hover:text-indigo-800`}
      to={url}
    >
      {icon}
      {itemName}
    </Link>
  );
}

export default NavButton;
