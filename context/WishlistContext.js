import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig'; // ensure correct path

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  // Load wishlist from Firestore
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, 'wishlists', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        } else {
          await setDoc(docRef, { items: [] }); // initialize if not exists
        }
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (product) => {
    if (!user) return;

    const docRef = doc(db, 'wishlists', user.uid);
    let updatedWishlist;

    if (wishlist.some(item => item.id === product.id)) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    await updateDoc(docRef, { items: updatedWishlist });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
