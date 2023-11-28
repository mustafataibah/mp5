import React from "react";
import { ShoppingCart, LogIn, User, X } from "react-feather";
import Link from "next/link";
import { useUser } from "../lib/UserContext";
import { useRouter } from "next/router";

type SidebarProps = {
  isOpen: boolean;
  setIsSideBarOpen: (isOpen: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsSideBarOpen }) => {
  const { user, signOut } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    setIsSideBarOpen(false);
    router.push("/");
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-Snow-White z-40 transform ${
        isOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
      } transition-all duration-300 ease-in-out w-full sm:w-[250px]`}>
      <div className="flex flex-col justify-between items-center text-black h-full">
        <button className="absolute top-4 right-4 sm:hidden" onClick={handleClose}>
          <X className="text-black" />
        </button>
        <div className="mt-10">
          {user ? (
            <>
              <Link href="/profile">
                <span className="flex items-center text-black -ml-2 mb-6 cursor-pointer hover:text-Blueberry-Blue">
                  <User className="mr-2" /> Profile
                </span>
              </Link>
              <Link href="/cart">
                <span className="flex items-center text-black -ml-2 mb-6 cursor-pointer hover:text-Blueberry-Blue">
                  <ShoppingCart className="mr-2" /> Cart
                </span>
              </Link>
            </>
          ) : (
            <Link href="/auth">
              <span className="flex items-center text-black -ml-2 mb-6 cursor-pointer hover:text-Blueberry-Blue">
                <LogIn className="mr-2" /> Sign In
              </span>
            </Link>
          )}
        </div>
        {user && (
          <div className="mb-10">
            <span
              className="flex items-center text-black ml-2 cursor-pointer hover:text-Blood-Red"
              onClick={handleSignOut}>
              Sign Out
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
