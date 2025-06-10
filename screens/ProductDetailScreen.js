import React from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet,
  FlatList, TouchableOpacity, ToastAndroid
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { wishlist, toggleWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return ToastAndroid.show('Please log in first.', ToastAndroid.SHORT);
      
      await setDoc(doc(db, 'cart', `${userId}_${product.id}`), {
        ...product,
        userId,
        quantity: 1,
        productId: product.id 
      });

      ToastAndroid.show('Added to Cart', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error adding to cart:', error);
      ToastAndroid.show('❌ Failed to add', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => toggleWishlist(product)}
          >
            <Ionicons
              name={isInWishlist ? 'heart' : 'heart-outline'}
              size={30}
              color={isInWishlist ? '#EF4444' : '#6B7280'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FBBF24" />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% Off</Text>
            </View>
          </View>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', marginBottom: 30 },
  imageContainer: { position: 'relative' },
  productImage: { width: '100%', height: 300, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  wishlistButton: {
    position: 'absolute', top: 20, right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, padding: 8,
  },
  infoContainer: { padding: 15 },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  ratingText: { fontSize: 16, color: '#6B7280', marginLeft: 4 },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  price: { fontSize: 20, color: '#14B8A6', fontWeight: 'bold', marginRight: 10 },
  discountBadge: { backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  discountText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  description: { fontSize: 16, color: '#4B5563', lineHeight: 24 },
  addToCartButton: {
    backgroundColor: '#F97316',
    paddingVertical: 15,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default ProductDetailScreen;
