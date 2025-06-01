import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import OfferCard from '../components/OfferCard';
import DealCard from '../components/DealCard';
import ScreenWrapper from './ScreenWrapper';

const { width } = Dimensions.get('window');

const categories = [
  { name: 'Phones', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg' },
  { name: 'Tablets', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg' },
  { name: 'Laptops', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg' },
  { name: 'Accessories', image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg' },
  { name: 'Headphones', image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg' },
  { name: 'Cameras', image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg' },
  { name: 'Watches', image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg' },
  { name: 'Speakers', image: 'https://images.pexels.com/photos/374087/pexels-photo-374087.jpeg' },
];

const banners = [
  { id: '1', image: 'https://images.pexels.com/photos/797793/pexels-photo-797793.jpeg', text: 'Summer Sale Up to 50% Off!' },
  { id: '2', image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg', text: 'New Arrivals in Tech!' },
  { id: '3', image: 'https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg', text: 'Exclusive Deals on Laptops!' },
];

const splitSection = {
  mainImage: 'https://images.pexels.com/photos/797793/pexels-photo-797793.jpeg',
  smallImages: [
    { id: 'sm1', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', text: 'Phone Deals' },
    { id: 'sm2', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg', text: 'Tablet Offers' },
    { id: 'sm3', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg', text: 'Laptop Discounts' },
    { id: 'sm4', image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg', text: 'Headphone Sales' },
  ],
};

const dealsSection = [
  { id: 'd1', title: 'Top Deals', image: 'https://images.pexels.com/photos/3185480/pexels-photo-3185480.jpeg' },
  { id: 'd2', title: 'Under $99', image: 'https://images.pexels.com/photos/3185481/pexels-photo-3185481.jpeg' },
  { id: 'd3', title: '60% Off', image: 'https://images.pexels.com/photos/3185479/pexels-photo-3185479.jpeg' },
  { id: 'd4', title: '80% Off', image: 'https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg' },
];

const deals = [
  { id: '1', name: 'iPhone 14 Pro', price: 999, discount: 10, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', rating: 4.5, description: 'The latest iPhone with advanced camera and performance.' },
  { id: '2', name: 'iPad Air', price: 599, discount: 15, image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg', rating: 4.2, description: 'Lightweight tablet with powerful features.' },
  { id: '3', name: 'MacBook Pro', price: 1299, discount: 20, image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg', rating: 4.8, description: 'High-performance laptop for professionals.' },
  { id: '4', name: 'AirPods Pro', price: 249, discount: 5, image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg', rating: 4.3, description: 'Wireless earbuds with noise cancellation.' },
];

const topPicks = [
  { id: '5', name: 'Samsung Galaxy S23', price: 799, discount: 12, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', rating: 4.6, description: 'Flagship smartphone with stunning display.' },
  { id: '6', name: 'Canon EOS R5', price: 2999, discount: 8, image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg', rating: 4.7, description: 'Professional camera for photography enthusiasts.' },
  { id: '7', name: 'Sony WH-1000XM5', price: 349, discount: 10, image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg', rating: 4.4, description: 'Top-rated noise-canceling headphones.' },
  { id: '8', name: 'Apple Watch Series 8', price: 399, discount: 15, image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg', rating: 4.5, description: 'Smartwatch with health tracking features.' },
];

const featuredOffers = [
  { id: 'f1', title: 'Free Shipping', description: 'On Orders Above $50', image: 'https://images.pexels.com/photos/5849583/pexels-photo-5849583.jpeg' },
  { id: 'f2', title: 'Cashback Offer', description: 'Get 10% Cashback Today', image: 'https://images.pexels.com/photos/4386421/pexels-photo-4386421.jpeg' },
];

const trendingNow = [
  { id: '9', name: '4K Monitor', price: 399, discount: 12, image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg', rating: 4.1, description: 'High-resolution monitor for work and gaming.' },
  { id: '10', name: 'Wireless Mouse', price: 49, discount: 8, image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg', rating: 4.0, description: 'Ergonomic mouse for productivity.' },
  { id: '11', name: 'Bluetooth Speaker', price: 99, discount: 10, image: 'https://images.pexels.com/photos/374087/pexels-photo-374087.jpeg', rating: 4.3, description: 'Portable speaker with great sound.' },
];

const recentlyViewed = [
  { id: '12', name: 'iPhone 13', price: 699, discount: 5, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', rating: 4.4, description: 'Previous-gen iPhone with great performance.' },
  { id: '13', name: 'iPad Mini', price: 499, discount: 10, image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg', rating: 4.2, description: 'Compact tablet for on-the-go use.' },
  { id: '14', name: 'JBL Speaker', price: 89, discount: 7, image: 'https://images.pexels.com/photos/374087/pexels-photo-374087.jpeg', rating: 4.5, description: 'Affordable speaker with deep bass.' },
];

const brands = [
  { name: 'Apple', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg' },
  { name: 'Samsung', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg' },
  { name: 'Sony', image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg' },
  { name: 'Dell', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg' },
  { name: 'JBL', image: 'https://images.pexels.com/photos/374087/pexels-photo-374087.jpeg' },
];

const HomeScreen = ({ navigation }) => {
  return (
    <ScreenWrapper>
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hello, User!</Text>
          <Text style={styles.subGreeting}>Happy Shopping</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
        />
      </View>

      {/* Banner Carousel */}
      <FlatList
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.bannerContainer}>
            <Image source={{ uri: item.image }} style={styles.banner} />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerText}>{item.text}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.bannerContainer}
      />

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryCard
              category={item.name}
              image={item.image}
              onPress={() => navigation.navigate('ProductListing', { category: item.name })}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>

      {/* Deals of the Day */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deals of the Day</Text>
        <FlatList
          data={deals}
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

      {/* Top Picks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Picks for You</Text>
        <FlatList
          data={topPicks}
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

      {/* Special Offers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        <FlatList
          data={featuredOffers}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <OfferCard offer={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Split Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore More</Text>
        <View style={styles.splitContainer}>
          <Image source={{ uri: splitSection.mainImage }} style={styles.splitMainImage} />
          <View style={styles.splitSmallContainer}>
            {splitSection.smallImages.map((item) => (
              <View key={item.id} style={styles.splitSmallItem}>
                <Image source={{ uri: item.image }} style={styles.splitSmallImage} />
                <View style={styles.splitSmallOverlay}>
                  <Text style={styles.splitSmallText}>{item.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Deals Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Deals</Text>
        <FlatList
          data={dealsSection}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <DealCard
              deal={item}
              onPress={() => navigation.navigate('ProductListing', { category: item.title })}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Trending Now */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Now</Text>
        <FlatList
          data={trendingNow}
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

      {/* Recently Viewed */}
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

      {/* Shop by Brand */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Brand</Text>
        <FlatList
          data={brands}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.brandCard}>
              <Image source={{ uri: item.image }} style={styles.brandImage} />
              <Text style={styles.brandText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>

      {/* Promotional Banner */}
      <View style={styles.promoBanner}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/797793/pexels-photo-797793.jpeg' }}
          style={styles.promoImage}
        />
        <View style={styles.promoOverlay}>
          <Text style={styles.promoText}>Get 20% Off on Your First Order!</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1E3A8A',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subGreeting: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  bannerContainer: {
    marginVertical: 10,
  },
  banner: {
    width: width - 20,
    height: 180,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bannerText: {
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
  splitContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  splitMainImage: {
    width: '50%',
    height: 200,
    borderRadius: 12,
    marginRight: 5,
  },
  splitSmallContainer: {
    width: '50%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitSmallItem: {
    width: '48%',
    height: 98,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 4,
  },
  splitSmallImage: {
    width: '100%',
    height: '100%',
  },
  splitSmallOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  splitSmallText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  brandCard: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  brandImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  brandText: {
    color: '#1F2937',
    fontSize: 14,
    textAlign: 'center',
  },
  promoBanner: {
    margin: 10,
    position: 'relative',
  },
  promoImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  promoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
  },
  promoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  promoButton: {
    backgroundColor: '#F97316',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  promoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;