import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <>
      <div className="h-[90vh] w-screen flex flex-col items-center justify-center relative">
        <div className="absolute inset-0">
          <Image src="/shapes.svg" alt="" layout="fill" objectFit="contain" />
        </div>

        <div className="flex flex-col items-center mt-[-100px] z-10">
          <h1 style={{ fontSize: "104px", lineHeight: "1" }} className="text-white font-bold">
            Where design {""}
            <span className="relative">
              meets
              <div>
                <Image src="/line.svg" alt="" layout="fixed" width={400} height={20} />
              </div>
            </span>
          </h1>
          <h1 style={{ fontSize: "104px", lineHeight: "1" }} className="text-white font-bold">
            functionality
          </h1>
        </div>

        <button
          style={{ width: "100px", height: "100px", border: "2px solid #43E748" }}
          className="rounded-full absolute bottom-10 mb-4 flex items-center justify-center">
          <Image src="/arrowIcon.svg" alt="" width="32" height="24" />
        </button>
      </div>

      <div className="bg-white text-black py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
