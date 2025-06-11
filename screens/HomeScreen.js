import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import ScreenWrapper from './ScreenWrapper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const { width } = Dimensions.get('window');

const categories = [
  { name: 'Phones', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg' },
  { name: 'Laptops', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg' },
  { name: 'Speakers', image: 'https://images.pexels.com/photos/374087/pexels-photo-374087.jpeg' },
  { name: 'Earphones', image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg' },
//  { name: 'TV', image: 'https://images.pexels.com/photos/159853/tv-television-lcd-technology-159853.jpeg' }
];

const banners = [
  { id: '1', image: 'https://images.pexels.com/photos/797793/pexels-photo-797793.jpeg', text: 'Summer Sale Up to 50% Off!' },
  { id: '2', image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg', text: 'New Arrivals in Tech!' },
  { id: '3', image: 'https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg', text: 'Exclusive Deals on Laptops!' }
];

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const name = user.displayName || user.email?.split('@')[0] || 'User';
      setUsername(name);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const deals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 5);
  const topPicks = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const trendingNow = products.filter(p => p.price >= 100 && p.price <= 300).slice(0, 5);
  const recentlyViewed = [...products].slice(-5).reverse();

  const renderHorizontalList = (data) => (
    <FlatList
      data={data}
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
  );

  const shimmerCards = () => (
    <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
      {[...Array(3)].map((_, index) => (
        <ShimmerPlaceHolder
          key={index}
          style={{ width: 140, height: 180, borderRadius: 12, marginRight: 10 }}
        />
      ))}
    </View>
  );

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hello, {username}!</Text>
            <Text style={styles.subGreeting}>Happy Shopping</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {searchQuery.trim() === '' ? (
          <>
            <FlatList
              data={banners}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (item.text === 'Summer Sale Up to 50% Off!') {
                      navigation.navigate('SaleScreen');
                    }
                  }}
                >
                  <View style={styles.bannerContainer}>
                    <Image source={{ uri: item.image }} style={styles.banner} />
                    <View style={styles.bannerOverlay}>
                      <Text style={styles.bannerText}>{item.text}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              style={styles.bannerContainer}
            />

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

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Deals of the Day</Text>
              {loading ? shimmerCards() : renderHorizontalList(deals)}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Top Picks for You</Text>
              {loading ? shimmerCards() : renderHorizontalList(topPicks)}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Now</Text>
              {loading ? shimmerCards() : renderHorizontalList(trendingNow)}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recently Viewed</Text>
              {renderHorizontalList(recentlyViewed)}
            </View>
          </>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {filteredProducts.length === 0 ? (
              <Text style={{ paddingHorizontal: 10 }}>No matching products found.</Text>
            ) : (
              <FlatList
                data={filteredProducts}
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
            )}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', marginTop: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#1E3A8A' },
  headerLeft: { flexDirection: 'column' },
  greeting: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  subGreeting: { fontSize: 14, color: '#D1D5DB' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10,
    backgroundColor: '#FFFFFF', margin: 10, borderRadius: 12, elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#1F2937' },
  bannerContainer: { marginVertical: 10 },
  banner: { width: width - 20, height: 180, marginHorizontal: 10, borderRadius: 12 },
  bannerOverlay: {
    position: 'absolute', bottom: 20, left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8
  },
  bannerText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  section: { marginVertical: 10, paddingHorizontal: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 10 }
});

export default HomeScreen;
