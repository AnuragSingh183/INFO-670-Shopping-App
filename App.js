import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { WishlistProvider } from './context/WishlistContext';

const App = () => {
  return (
    <WishlistProvider>
      <AppNavigator />
    </WishlistProvider>
  );
};

export default App;