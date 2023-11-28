import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-Night-Black text-Snow-White p-4">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="my-2">
          <Image src="/logo.svg" alt="Logo" width={100} height={50} />
        </div>

        <div>
          <p>&copy; 2023 Mustafa Taibah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
