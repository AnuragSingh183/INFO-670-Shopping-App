import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ScreenWrapper from './ScreenWrapper';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';


if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const YourOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const user = getAuth().currentUser;
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const snapshot = await getDocs(ordersQuery);
        const userOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(userOrders);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const handleToggleExpand = (orderId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  const handleReorder = async (items) => {
    if (!user) return;
    try {
      for (let item of items) {
        const docId = `${user.uid}_${item.productId}`;
        await setDoc(doc(db, 'cart', docId), {
          ...item,
          userId: user.uid,
          quantity: item.quantity || 1
        });
      }
      alert('Items added to cart!');
    } catch (error) {
      console.error('Reorder failed:', error);
    }
  };

  const renderOrderItem = ({ item }) => {
    const statusColor = item.status === 'Delivered'
      ? '#10B981' : item.status === 'Canceled'
      ? '#EF4444' : '#F59E0B';

    return (
      <TouchableOpacity onPress={() => handleToggleExpand(item.id)} style={styles.orderCard}>
        <Text style={styles.orderId}>Order ID: <Text style={styles.bold}>{item.id}</Text></Text>
        <Text style={styles.detailText}>Total: <Text style={styles.price}>${item.total?.toFixed(2)}</Text></Text>
        <Text style={styles.detailText}>Date: {item.timestamp?.toDate().toLocaleDateString()}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{item.status || 'Order Placed'}</Text>
        </View>

        {expandedOrderId === item.id && (
          <View style={styles.itemsContainer}>
            <Text style={styles.itemHeader}>Items Ordered:</Text>
            {item.items?.map((product, idx) => (
              <View key={idx} style={styles.itemRow}>
                <Text style={styles.itemName}>{product.name}</Text>
                
                <Text style={styles.itemPrice}>${product.price}</Text>
     
                
              </View>
            ))}
            <TouchableOpacity
              onPress={() => handleReorder(item.items)}
              style={styles.reorderButton}
            >
              <Text style={styles.reorderText}>Reorder</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
    {loading ? (
  <View style={styles.container}>
    {[...Array(3)].map((_, idx) => (
      <View key={idx} style={styles.shimmerCard}>
        <ShimmerPlaceHolder style={styles.shimmerLine} />
        <ShimmerPlaceHolder style={styles.shimmerLine} />
        <ShimmerPlaceHolder style={[styles.shimmerLine, { width: '60%' }]} />
        <ShimmerPlaceHolder style={[styles.shimmerBadge, { width: 80 }]} />
      </View>
    ))}
  </View>
) : (
  <FlatList
    data={orders}
    renderItem={renderOrderItem}
    keyExtractor={item => item.id}
    ListEmptyComponent={<Text style={styles.emptyText}>You haven't placed any orders yet.</Text>}
    contentContainerStyle={styles.container}
  />
)}

    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 15, backgroundColor: '#F3F4F6' },
  shimmerCard: {
  backgroundColor: '#FFFFFF',
  padding: 16,
  borderRadius: 12,
  marginBottom: 15,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.07,
  shadowRadius: 3,
},
shimmerLine: {
  height: 14,
  borderRadius: 8,
  marginBottom: 10,
},
shimmerBadge: {
  height: 20,
  borderRadius: 6,
  marginTop: 6,
},

  orderCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
  },
  orderId: { fontSize: 16, color: '#374151', marginBottom: 4 },
  bold: { fontWeight: 'bold', color: '#1E3A8A' },
  detailText: { fontSize: 15, color: '#4B5563', marginBottom: 2 },
  price: { color: '#10B981', fontWeight: '600' },
  statusBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: { fontSize: 14, color: '#FFFFFF', fontWeight: '600' },
  itemsContainer: { marginTop: 12, borderTopWidth: 1, borderColor: '#E5E7EB', paddingTop: 10 },
  itemHeader: { fontWeight: 'bold', marginBottom: 8, color: '#374151' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  itemName: { flex: 1, color: '#1F2937' },
  itemQty: { color: '#6B7280' },
  itemPrice: { color: '#14B8A6' },
  reorderButton: {
    marginTop: 10,
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  reorderText: { color: '#FFFFFF', fontWeight: '600' },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#6B7280', marginTop: 40 },
});

export default YourOrdersScreen;
