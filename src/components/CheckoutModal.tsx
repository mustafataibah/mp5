import React, { useState } from "react";

type CheckoutModalProps = {
  cartItems: { title: string; price: number }[];
  isOpen: boolean;
  onClose: () => void;
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ cartItems, isOpen, onClose }) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const completeCheckout = () => {
    setCheckoutComplete(true);
  };

  if (!isOpen) return null;

  const modalSizeClass = checkoutComplete ? "w-full max-w-2xl p-8" : "w-full max-w-md p-4";
  const modalButtonClass = checkoutComplete ? "bg-red-500 hover:bg-Blood-Red" : "bg-Neon-Green hover:bg-green-700";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
      <div className={`bg-white rounded-lg shadow-lg ${modalSizeClass}`}>
        {!checkoutComplete ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <p>Email: user@example.com</p>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={completeCheckout}
              className={`${modalButtonClass} text-white font-bold py-2 px-4 rounded mt-4`}>
              Confirm Checkout
            </button>
          </div>
        ) : (
          <div>
            <p>Looking forward to working with you, we will be in touch soon!</p>
            <button onClick={onClose} className={`${modalButtonClass} text-white font-bold py-2 px-4 rounded mt-4`}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
