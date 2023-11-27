import React, { useState } from "react";
import Image from "next/image";
import CheckoutModal from "../components/CheckoutModal";

type Product = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
};

const cartItems: Product[] = [
  {
    id: "1",
    title: "Package",
    imageUrl: "/placeholder.jpg",
    description: "Desc",
    price: 299,
  },
  {
    id: "2",
    title: "Package",
    imageUrl: "/placeholder.jpg",
    description: "Desc",
    price: 299,
  },
  {
    id: "3",
    title: "Package",
    imageUrl: "/placeholder.jpg",
    description: "Desc",
    price: 299,
  },
];

const Cart: React.FC = () => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseModal = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-Snow-White font-black my-4">Your Cart</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id} className="flex border-b py-2 items-center">
            <div className="flex-none w-48 px-2">
              <div className="my-2 relative" style={{ width: "150px", height: "150px" }}>
                <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="cover" className="rounded-lg" />
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
      {/* Padding Bottom */}
      <div className="h-[10vh]"></div>
    </div>
  );
};

export default Cart;
