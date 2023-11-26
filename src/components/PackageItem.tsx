import React from "react";
import Image from "next/image";

type PackageItemProps = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

const PackageItem: React.FC<PackageItemProps> = ({ title, description, price, imageUrl }) => {
  return (
    <div className="flex flex-col bg-Dark-Blue rounded-3xl overflow-hidden w-[25%] m-4">
      <div className="w-full h-80 relative">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4 bg-Snow-White text-black text-left">
        <h3 className="text-[32px] font-black text-Dark-Blue hover:text-Blood-Red cursor-pointer">{title}</h3>
        <p className="text-Dark-Blue my-4">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-Dark-Blue">${price}</p>
          <button className="bg-Blueberry-Blue text-white py-2 px-4 rounded-md hover:bg-Blackberry-Blue">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageItem;
