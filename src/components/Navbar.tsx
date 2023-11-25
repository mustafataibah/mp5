import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const formattedDate = `${dayName} ${day}.${month}`;

  return (
    <div className="flex justify-between items-center mx-[72px] my-[20px]">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </div>
      {/* Invisible for spacing evenly */}
      <div className="flex items-center opacity-0">
        <Image src="/logo.svg" alt="Invisible Spacer" width={100} height={100} />
      </div>

      <div className="flex-grow flex justify-center items-center">
        <a href="#" className="mx-4">
          Home
        </a>
        <a href="#" className="mx-4">
          Packages
        </a>
      </div>

      <div className="flex items-center">
        <span className="mr-8">{formattedDate}</span>
        <Image src="/menuIcon.svg" alt="Menu" width={75} height={75} />
      </div>
    </div>
  );
};

export default Navbar;
