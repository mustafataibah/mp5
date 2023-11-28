import React from "react";
import Image from "next/image";

type PackageItemProps = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  onAddToCart: () => void;
};

const PackageItem: React.FC<PackageItemProps> = ({ title, description, price, imageUrl, onAddToCart }) => {
  return (
    <div className="flex flex-col bg-Dark-Blue rounded-3xl overflow-hidden max-w-[400px] m-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="w-full h-80 relative">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col justify-between p-4 bg-Snow-White text-black text-left min-h-[250px]">
        <h3 className="text-lg md:text-2xl lg:text-3xl font-black text-Dark-Blue hover:text-Blood-Red cursor-pointer">
          {title}
        </h3>
        <p className="text-Dark-Blue my-4">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-Dark-Blue">${price}</p>
          <button
            onClick={onAddToCart}
            className="bg-Blueberry-Blue text-white py-2 px-4 rounded-md hover:bg-Blackberry-Blue">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageItem;
