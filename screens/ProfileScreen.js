import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [phoneNumber, setPhoneNumber] = useState('Loading...');
  const [orders, setOrders] = useState([]);

 useFocusEffect(
  React.useCallback(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setPhoneNumber(userDoc.data().phoneNumber || 'No Phone Number');
        } else {
          setPhoneNumber('No Phone Number');
        }

        const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(ordersQuery);
        const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(userOrders);
      }
    };

    fetchUserData();

    // Optional: cleanup function
    return () => {};
  }, [user])
);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest';
  const photoURL = user?.photoURL;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  const goToCart = () => {
    navigation.navigate('CartScreen');
  };

  const goToOrders = () => {
    navigation.navigate('YourOrdersScreen');
  };

  const data = [
    { type: 'header', key: 'header' },
    { type: 'cart', key: 'cart' },
    { type: 'orders', key: 'orders' },
    { type: 'logout', key: 'logout' },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={styles.header}>
            <View style={styles.avatarWrapper}>
              {photoURL ? (
                <Image source={{ uri: photoURL }} style={styles.profilePicture} />
              ) : (
                <Ionicons name="person-circle-outline" size={100} color="#9CA3AF" />
              )}
            </View>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{user?.email || 'No Email'}</Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          </View>
        );
      case 'cart':
        return (
          <TouchableOpacity style={styles.option} onPress={goToCart}>
            <View style={styles.optionContent}>
              <Ionicons name="cart-outline" size={24} color="#1E3A8A" />
              <Text style={styles.optionText}>My Cart</Text>
            </View>
          </TouchableOpacity>
        );
      case 'orders':
        return (
          <TouchableOpacity style={styles.option} onPress={goToOrders}>
            <View style={styles.optionContent}>
              <Ionicons name="list-outline" size={24} color="#1E3A8A" />
              <Text style={styles.optionText}>My Orders</Text>
            </View>
          </TouchableOpacity>
        );
      case 'logout':
        return (
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <View style={styles.optionContent}>
              <Ionicons name="log-out-outline" size={24} color="#EF4444" />
              <Text style={[styles.optionText, { color: '#EF4444' }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 40,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#6B7280',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    margin: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 10,
  },
});

export default ProfileScreen;