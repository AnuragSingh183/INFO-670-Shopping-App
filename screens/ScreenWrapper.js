import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const ScreenWrapper = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Match the background color used across screens
  },
  container: {
    flex: 1,
    paddingTop: 10, // Consistent top padding for all screens
    paddingHorizontal: 2, // Consistent horizontal padding
  },
});

export default ScreenWrapper;