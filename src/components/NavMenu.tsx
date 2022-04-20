import NavButton from "./NavButton";
import {
  HomeIcon,
  CogIcon,
  LightningBoltIcon,
  TemplateIcon,
} from "@heroicons/react/outline";

import Logo from "../images/dots.svg";

type Props = {};

function NavMenu({}: Props) {
  return (
    <nav className="hidden min-w-full h-4/6 lg:flex flex-col gap-4 xl:gap-8  ">
      <div className="w-8 h-8 self-end mr-8">
        <img src={Logo} alt="Logo" />
      </div>
      <NavButton
        url="/home"
        itemName="Home"
        icon={<HomeIcon className="w-4 h-4 xl:h-8 xl:w-8 " />}
      />
      <NavButton
        url="/tasks"
        itemName="Tasks"
        icon={<LightningBoltIcon className="w-4 h-4 xl:h-8 xl:w-8 " />}
      />
      <NavButton
        url="/dashboard"
        itemName="Dashboard"
        icon={<TemplateIcon className="w-4 h-4 xl:h-8 xl:w-8 " />}
      />
      <NavButton
        url="/settings"
        itemName="Settings"
        icon={<CogIcon className="w-4 h-4 xl:h-8 xl:w-8 " />}
      />
    </nav>
  );
}

export default NavMenu;
