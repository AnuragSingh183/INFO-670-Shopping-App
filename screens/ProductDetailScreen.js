import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

const relatedProducts = [
  { id: '5', name: 'Samsung Galaxy S23', price: 799, discount: 12, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', rating: 4.6, description: 'Flagship smartphone with stunning display.' },
  { id: '6', name: 'Canon EOS R5', price: 2999, discount: 8, image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg', rating: 4.7, description: 'Professional camera for photography enthusiasts.' },
  { id: '7', name: 'Sony WH-1000XM5', price: 349, discount: 10, image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg', rating: 4.4, description: 'Top-rated noise-canceling headphones.' },
];

const recentlyViewed = [
  { id: '12', name: 'iPhone 13', price: 699, discount: 5, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', rating: 4.4, description: 'Previous-gen iPhone with great performance.' },
  { id: '13', name: 'iPad Mini', price: 499, discount: 10, image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg', rating: 4.2, description: 'Compact tablet for on-the-go use.' },
];

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { wishlist, toggleWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <View style={styles.container}>
    <ScrollView style={styles.container}>
      {/* Product Image */}
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

      {/* Product Info */}
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

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Related Products Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Related Products</Text>
        <FlatList
          data={relatedProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Recently Viewed Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Viewed</Text>
        <FlatList
          data={recentlyViewed}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 30,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  wishlistButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    padding: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    color: '#14B8A6',
    fontWeight: 'bold',
    marginRight: 10,
  },
  discountBadge: {
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
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  addToCartButton: {
    backgroundColor: '#F97316',
    paddingVertical: 15,
    margin: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
});

export default ProductDetailScreen;