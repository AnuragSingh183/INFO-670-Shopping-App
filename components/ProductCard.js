import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, onPress }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{product.discount}% Off</Text>
      </View>
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => toggleWishlist(product)}
      >
        <Ionicons
          name={isInWishlist ? 'heart' : 'heart-outline'}
          size={24}
          color={isInWishlist ? '#EF4444' : '#6B7280'}
        />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FBBF24" />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 5,
    width: 200,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 5,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#14B8A6',
    fontWeight: 'bold',
  },
});

export default ProductCard;