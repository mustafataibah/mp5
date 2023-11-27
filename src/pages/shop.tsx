import React from "react";
import PackageItem from "../components/PackageItem";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PACKAGES, ADD_TO_CART_MUTATION } from "../lib/queries";
import { useUser } from "../lib/UserContext";

const Shop: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PACKAGES);
  const [addToCart] = useMutation(ADD_TO_CART_MUTATION);
  const { user } = useUser();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Back Soon!</p>;

  const packages = data.getProducts;

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    try {
      await addToCart({ variables: { userId: user.id, productId } });
      console.log("Added to cart");
    } catch (err) {
      console.error("Error adding to cart", err);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-black ml-4"> Our Packages</h1>
      <div className="flex justify-center flex-wrap gap-2">
        {packages.map((pkg: any) => (
          <PackageItem key={pkg.id} {...pkg} onAddToCart={() => handleAddToCart(pkg.id)} />
        ))}
      </div>
      {/* Padding Bottom */}
      <div className="h-[10vh]"></div>
    </div>
  );
};

export default Shop;
