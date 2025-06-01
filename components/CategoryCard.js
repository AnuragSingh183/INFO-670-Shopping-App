import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CategoryCard = ({ category, image, onPress }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.categoryImage} />
    <Text style={styles.categoryText}>{category}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  categoryText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CategoryCard;