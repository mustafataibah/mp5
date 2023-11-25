import test from "node:test";
import React from "react";

type MenuProps = {
  isOpen: boolean;
  toggle: () => void;
};

const testFunction = {};

const MenuIcon: React.FC<MenuProps> = ({ isOpen, toggle }) => {
  return (
    <div onClick={toggle} className={`cursor-pointer w-[70px] h-[18px] flex flex-col justify-between items-center`}>
      <div
        className={`h-[2px] w-full bg-white transition-transform duration-300 ${
          isOpen ? "rotate-45 translate-y-[8px]" : ""
        }`}></div>
      <div
        className={`h-[2px] w-full bg-white transition-transform duration-300 ${
          isOpen ? "-rotate-45 -translate-y-[8px]" : ""
        }`}></div>
    </div>
  );
};

export default MenuIcon;
