import React, { useState } from "react";
import Image from "next/image";
import CheckoutModal from "../components/CheckoutModal";
import { GET_CART_ITEMS_QUERY } from "../lib/queries";
import { useUser } from "../lib/UserContext";
import { useQuery } from "@apollo/client";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

const Cart: React.FC = () => {
  const { user } = useUser();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_CART_ITEMS_QUERY, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const cartItems = data?.getCartItemsByUserId || [];

  const totalPrice = cartItems.reduce((total: number, item: Product) => total + item.price, 0);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseModal = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="container h-[94vh] mx-auto p-4">
      <h1 className="text-3xl text-Snow-White font-black my-4">Your Cart</h1>
      <div>
        {cartItems.map((item: Product) => (
          <div key={item.id} className="flex border-b py-2 items-center">
            <div className="flex-none w-48 px-2">
              <div className="my-2 relative" style={{ width: "150px", height: "150px" }}>
                {/* <Image
                  src="placeholder.jpg"
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                /> */}
              </div>
            </div>
            <div className="flex-grow px-4">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <div className="flex-none text-right">
              <span className="text-lg font-semibold">${item.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-lg font-semibold my-4 text-right">Total: ${totalPrice.toFixed(2)}</div>
      <button
        onClick={handleCheckout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right">
        Checkout
      </button>
      <CheckoutModal cartItems={cartItems} isOpen={isCheckoutOpen} onClose={handleCloseModal} />
      <div className="h-[10vh]"></div>
    </div>
  );
};

export default Cart;
