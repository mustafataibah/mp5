import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();

  // To close sidebar when navigating to another page
  useEffect(() => {
    const handleRouteChange = () => {
      setIsSideBarOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSidebarOpen);
  };

  const sidebarWidth = "250px";

  return (
    <>
      <Navbar openSidebar={toggleSidebar} isSideBarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? `pr-[${sidebarWidth}]` : ""}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
