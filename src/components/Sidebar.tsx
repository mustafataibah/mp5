import React from "react";
import { ShoppingCart } from "react-feather";
import Link from "next/link";

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-Snow-White w-[250px] z-40 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col justify-between items-center text-black h-full">
        <div className="mt-10">
          <Link href="/">
            <span className="flex items-center text-black ml-2 mb-4 cursor-pointer">Sign In</span>
          </Link>
          <Link href="/">
            <span className="flex items-center text-black ml-2 mb-4 cursor-pointer hidden">Profile</span>
          </Link>
          <Link href="/cart">
            <span className="flex items-center text-black mb-4 cursor-pointer">
              <ShoppingCart className="mr-2" /> Cart
            </span>
          </Link>
        </div>
        <div className="mb-10">
          <Link href="/">
            <span className="flex items-center text-black ml-2 cursor-pointer hidden hover:text-Blood-Red">
              Sign Out
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
