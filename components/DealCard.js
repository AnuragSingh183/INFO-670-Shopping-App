import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const DealCard = ({ deal, onPress }) => (
  <TouchableOpacity style={styles.dealCard} onPress={onPress}>
    <Image source={{ uri: deal.image }} style={styles.dealImage} />
    <View style={styles.dealOverlay}>
      <Text style={styles.dealText}>{deal.title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  dealCard: {
    width: 150,
    height: 150,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: '100%',
  },
  dealOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dealText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DealCard;