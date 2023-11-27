import React from "react";
import PackageItem from "../components/PackageItem";
import { useQuery } from "@apollo/client";
import { GET_PACKAGES } from "../components/queries";

const Shop: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PACKAGES);

  console.log("test", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const packages = data.getProducts;
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-black ml-4"> Our Packages</h1>
      <div className="flex justify-center flex-wrap gap-2">
        {packages.map((pkg: any) => (
          <PackageItem key={pkg.id} {...pkg} />
        ))}
      </div>
      {/* Padding Bottom */}
      <div className="h-[10vh]"></div>
    </div>
  );
};

export default Shop;
