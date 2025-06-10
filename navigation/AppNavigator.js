// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';

// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import HomeScreen from '../screens/HomeScreen';
// import ProductListingScreen from '../screens/ProductListingScreen';
// import ProductDetailScreen from '../screens/ProductDetailScreen';
// import WishlistScreen from '../screens/WishlistScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Bottom Tab Navigator for Home, Wishlist, and Profile
// const TabNavigator = () => (
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ color, size }) => {
//         let iconName;
//         if (route.name === 'Home') iconName = 'home';
//         else if (route.name === 'Wishlist') iconName = 'heart';
//         else if (route.name === 'Profile') iconName = 'person';
//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       tabBarActiveTintColor: '#6200EE',
//       tabBarInactiveTintColor: 'gray',
//       headerShown: false,
//     })}
//   >
//     <Tab.Screen name="Home" component={HomeScreen} />
//     <Tab.Screen name="Wishlist" component={WishlistScreen} />
//     <Tab.Screen name="Profile" component={ProfileScreen} />
//   </Tab.Navigator>
// );

// // Main Stack Navigator
// const AppNavigator = () => (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
//       <Stack.Screen name="ProductListing" component={ProductListingScreen} options={{ title: 'Products' }} />
//       <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
//     </Stack.Navigator>
//   </NavigationContainer>
// );

// export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductListingScreen from '../screens/ProductListingScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/cartScreen';
import SaleScreen from '../screens/saleScreen';
import CheckoutScreen from '../screens/checkoutScreen';
import PaymentScreen from '../screens/paymentScreen';
import OrderConfirmationScreen from '../screens/orderConfirmationScreen';
import YourOrdersScreen from '../screens/yourOrdersScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Home, Products, Wishlist, and Profile
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Products') iconName = 'grid';
        else if (route.name === 'Wishlist') iconName = 'heart';
        else if (route.name === 'Profile') iconName = 'person';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6200EE',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Products" component={ProductListingScreen} initialParams={{ category: 'All Products' }} />
    <Tab.Screen name="Wishlist" component={WishlistScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Main Stack Navigator
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ProductListing" component={ProductListingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
      <Stack.Screen name="CartScreen" component={CartScreen} options={{ title: 'My Cart' }} /> 
      <Stack.Screen name="SaleScreen" component={SaleScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Payment' }} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ title: 'Order Confirmation' }} />
      <Stack.Screen name="YourOrdersScreen" component={YourOrdersScreen} options={{ title: 'My Orders' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;