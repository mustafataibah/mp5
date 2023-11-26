import React from "react";
import { ShoppingCart } from "react-feather";
import Link from "next/link";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-Snow-White w-[250px] z-40 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col items-center mt-10">
        <Link href="/cart">
          <span className="flex items-center text-black mb-4">
            <ShoppingCart className="mr-2" /> Cart
          </span>
        </Link>
        <button className="bg-Blueberry-Blue text-white px-6 py-2 rounded">Checkout</button>
      </div>
    </div>
  );
};

export default Sidebar;
