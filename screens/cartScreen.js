import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

  const fetchCartItems = async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) return;

      const q = query(collection(db, 'cart'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);

      const sum = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
      setTotal(sum);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

const removeItem = async (productId) => {
  try {
    const user = getAuth().currentUser;
    if (!user) return;

    const docId = `${user.uid}_${productId}`;
    await deleteDoc(doc(db, 'cart', docId));
    console.log('Item removed with ID:', docId);

    // Optimistically update the UI
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.productId !== productId);

      // Recalculate the total based on updated items
      const newTotal = updatedItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
      setTotal(newTotal);

      return updatedItems;
    });

  } catch (error) {
    console.error('Error removing item:', error);
  }
};





  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.quantity}>Qty: {item.quantity || 1}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.productId)}>
  <Text style={styles.removeText}>Remove</Text>
</TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('CheckoutScreen', { cartItems, total })}
          disabled={cartItems.length === 0}
        >
          <Text style={styles.checkoutText}>Continue to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 10 },
  title: { fontSize: 22, fontWeight: '600', color: '#1A2E44', marginBottom: 10, textAlign: 'center' },
  listContent: { paddingBottom: 100 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  itemInfo: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '500', color: '#1A2E44' },
  price: { color: '#14B8A6', fontWeight: '500' },
  quantity: { color: '#6B7280', fontSize: 14 },
  removeButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalText: { fontSize: 18, fontWeight: '600', color: '#1E3A8A', textAlign: 'center', marginBottom: 10 },
  checkoutButton: {
    backgroundColor: '#14B8A6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 16,
    padding: 20,
  },
});

export default CartScreen;