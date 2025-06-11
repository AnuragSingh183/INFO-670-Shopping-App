import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

const WishlistScreen = ({ navigation }) => {
  const { wishlist, loading } = useWishlist();


  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Your wishlist is empty</Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.shopNowButton, { backgroundColor: '#1E3A8A', marginTop: 10 }]}
        onPress={() => navigation.navigate('ProductListing', { category: 'All Products' })}
      >
        <Text style={styles.shopNowText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wishlist</Text>
      {wishlist.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={wishlist}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 40,
    paddingHorizontal: 2, // Adjusted padding
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  row: {
    paddingHorizontal: 2, // Add padding to control spacing
  },
  listContent: {
    paddingHorizontal: 2, // Adjust padding for the entire list
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 20,
  },
  shopNowButton: {
    backgroundColor: '#F97316',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  shopNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WishlistScreen;