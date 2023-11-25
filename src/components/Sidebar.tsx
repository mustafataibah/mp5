import React from "react";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white w-[250px] z-40 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col items-center mt-10">
        <div className=" text-black mb-4">Cart</div>
        <div className="text-black mb-4">Profile</div>
        <button className="bg-Neon-Green text-white px-6 py-2 rounded">Checkout</button>
      </div>
    </div>
  );
};

export default Sidebar;
