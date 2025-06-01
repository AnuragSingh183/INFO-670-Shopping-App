import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const OfferCard = ({ offer }) => (
  <View style={styles.offerCard}>
    <Image source={{ uri: offer.image }} style={styles.offerImage} />
    <View style={styles.offerOverlay}>
      <Text style={styles.offerTitle}>{offer.title}</Text>
      <Text style={styles.offerDescription}>{offer.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  offerCard: {
    width: 200,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  offerImage: {
    width: '100%',
    height: '100%',
  },
  offerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  offerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  offerDescription: {
    color: '#D1D5DB',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default OfferCard;