import React, { useState } from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSidebarOpen);
  };

  const sidebarWidth = "250px";

  return (
    <>
      <Navbar openSidebar={toggleSidebar} isSideBarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? `pr-[${sidebarWidth}]` : ""}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
