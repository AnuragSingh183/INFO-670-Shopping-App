import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import ScreenWrapper from './ScreenWrapper';

const OrderConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { address, cartItems, total, paymentMethod } = route.params || {};

  const handleConfirmOrder = async () => {
    const user = getAuth().currentUser;
    if (!user) return;

    try {
      // Save the order to Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cartItems,
        address,
        total,
        paymentMethod,
        timestamp: new Date(),
      });

      // Clear the cart by deleting all cart items for the user
      const cartQuery = query(collection(db, 'cart'), where('userId', '==', user.uid));
      const cartSnapshot = await getDocs(cartQuery);
      const deletePromises = cartSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      console.log('Order placed and cart cleared with address:', address);
      navigation.navigate('Home'); // Navigate to Home after confirmation
    } catch (error) {
      console.error('Error placing order or clearing cart:', error);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Order Confirmation</Text>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>Name: {address?.fullName || 'N/A'}</Text>
          <Text style={styles.addressText}>Street: {address?.street || 'N/A'}</Text>
          <Text style={styles.addressText}>City: {address?.city || 'N/A'}</Text>
          <Text style={styles.addressText}>State: {address?.state || 'N/A'}</Text>
          <Text style={styles.addressText}>Postal Code: {address?.postalCode || 'N/A'}</Text>
          <Text style={styles.addressText}>Country: {address?.country || 'N/A'}</Text>
        </View>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text style={styles.paymentText}>{paymentMethod || 'N/A'}</Text>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Text style={styles.totalText}>Total: ${total?.toFixed(2) || '0.00'}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <Text style={styles.confirmText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A2E44',
    textAlign: 'center',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1A2E44',
    marginTop: 15,
  },
  addressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  addressText: {
    fontSize: 16,
    color: '#6B7280',
    marginVertical: 2,
  },
  paymentText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 15,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A8A',
    textAlign: 'center',
    marginVertical: 15,
  },
  confirmButton: {
    backgroundColor: '#14B8A6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OrderConfirmationScreen;