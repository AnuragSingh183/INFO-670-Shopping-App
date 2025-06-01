import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import ProductCard from '../components/ProductCard';
import ScreenWrapper from './ScreenWrapper';

// Mock product data (replace with actual data in a real app)
const products = [
  { id: '1', name: 'iPhone 14 Pro', price: 999, discount: 10, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', rating: 4.5, description: 'The latest iPhone with advanced camera and performance.', category: 'Phones' },
  { id: '2', name: 'iPad Air', price: 599, discount: 15, image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg', rating: 4.2, description: 'Lightweight tablet with powerful features.', category: 'Tablets' },
  { id: '3', name: 'MacBook Pro', price: 1299, discount: 20, image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg', rating: 4.8, description: 'High-performance laptop for professionals.', category: 'Laptops' },
  { id: '4', name: 'AirPods Pro', price: 249, discount: 5, image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg', rating: 4.3, description: 'Wireless earbuds with noise cancellation.', category: 'Headphones' },
  { id: '5', name: 'Samsung Galaxy S23', price: 799, discount: 12, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', rating: 4.6, description: 'Flagship smartphone with stunning display.', category: 'Phones' },
  { id: '6', name: 'Canon EOS R5', price: 2999, discount: 8, image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg', rating: 4.7, description: 'Professional camera for photography enthusiasts.', category: 'Cameras' },
];

// Categories for the dropdown
const categories = [
  'All Products',
  'Phones',
  'Tablets',
  'Laptops',
  'Headphones',
  'Cameras',
];

const ProductListingScreen = ({ route, navigation }) => {
  const { category: initialCategory } = route.params || { category: 'All Products' };
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All Products'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity>
          {/* <Ionicons name="filter" size={24} color="#FFFFFF" /> */}
        </TouchableOpacity>
      </View>

      {/* Category Dropdown */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
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
    </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#1E3A8A',
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dropdownContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  row: {
    paddingHorizontal: 2, // Add padding to the row to control spacing
  },
  listContent: {
    paddingHorizontal: 2, // Adjust padding for the entire list
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default ProductListingScreen;