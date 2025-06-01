import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'; // Add Dimensions import

const SponsoredCard = ({ item }) => (
  <View style={styles.sponsoredCard}>
    <Image source={{ uri: item.image }} style={styles.sponsoredImage} />
    <View style={styles.sponsoredOverlay}>
      <Text style={styles.sponsoredText}>{item.text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  sponsoredCard: {
    width: (Dimensions.get('window').width - 40) * 0.9, // 90% of the available width
    height: 200,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  sponsoredImage: {
    width: '100%',
    height: '100%',
  },
  sponsoredOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sponsoredText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SponsoredCard;