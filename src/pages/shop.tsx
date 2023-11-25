import React from "react";
import PackageItem from "../components/PackageItem";

const placeholderPackages = [
  {
    id: "1",
    title: "Basic Web Package",
    description: "A basic package for small website.",
    price: 299,
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "2",
    title: "Basic Web Package",
    description: "A basic package for small website.",
    price: 299,
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "3",
    title: "Basic Web Package",
    description: "A basic package for small website.",
    price: 299,
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "4",
    title: "Basic Web Package",
    description: "A basic package for small website.",
    price: 299,
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "5",
    title: "Basic Web Package",
    description: "A basic package for small website.",
    price: 299,
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "6",
    title: "Basic Web Package",
    description: "A basic package for small website.",
    price: 299,
    imageUrl: "/placeholder.jpg",
  },
];

const Shop: React.FC = () => {
  const packages = placeholderPackages;

  return (
    <div className="flex flex-col mx-18">
      <h2 className="pl-[72px] text-Snow-White text-3xl font-black my-4">Our Packages</h2>
      <div className="flex justify-center flex-wrap gap-2">
        {packages.map((pkg) => (
          <PackageItem key={pkg.id} {...pkg} />
        ))}
      </div>
      {/* Padding Bottom */}
      <div className="h-[10vh]"></div>
    </div>
  );
};

export default Shop;
