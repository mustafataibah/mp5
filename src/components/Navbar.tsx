import React from "react";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "./MenuIcon";

const Navbar: React.FC<{ openSidebar: () => void; isSideBarOpen: boolean }> = ({ openSidebar, isSideBarOpen }) => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const formattedDate = `${dayName} ${day}.${month}`;

  return (
    <div
      className={`flex justify-between items-center mx-[72px] my-[20px] transition-all duration-300 ease-in-out ${
        isSideBarOpen ? "pr-[250px]" : ""
      }`}>
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </div>
      {/* Invisible for spacing evenly */}
      <div className="flex items-center opacity-0 md:flex hidden">
        <Image src="/logo.svg" alt="Invisible Spacer" width={100} height={100} />
      </div>

      <div className="flex-grow flex justify-center items-center md:flex hidden">
        <Link href="/">
          <span className="mx-4 cursor-pointer">Home</span>
        </Link>
        <Link href="/shop">
          <span className="mx-4 cursor-pointer">Packages</span>
        </Link>
      </div>

      <div className="flex items-center">
        <span className="mr-8 sm:flex hidden text-Dark-Gray">{formattedDate}</span>
        <MenuIcon isOpen={isSideBarOpen} toggle={openSidebar} />
      </div>
    </div>
  );
};

export default Navbar;
