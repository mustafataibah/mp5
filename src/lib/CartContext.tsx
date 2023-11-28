import React, { createContext, useContext, useState, ReactNode } from "react";

type CartItemType = {
  id: string;
  title: string;
  description: string;
  price: number;
};

type CartContextType = {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
};

const defaultCartContext: CartContextType = {
  cartItems: [],
  addToCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultCartContext);

export const useCart = () => useContext(CartContext);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addToCart = (item: CartItemType) => {
    setCartItems([...cartItems, item]);
  };

  return <CartContext.Provider value={{ cartItems, addToCart }}>{children}</CartContext.Provider>;
};
