import React, { createContext, useState, useContext } from 'react';

// Initial mock wishlist data (replace with actual data in a real app)
const initialWishlistItems = [
  { id: '5', name: 'Samsung Galaxy S23', price: 799, discount: 12, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', rating: 4.6, description: 'Flagship smartphone with stunning display.' },
  { id: '7', name: 'Sony WH-1000XM5', price: 349, discount: 10, image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg', rating: 4.4, description: 'Top-rated noise-canceling headphones.' },
];

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(initialWishlistItems);

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);