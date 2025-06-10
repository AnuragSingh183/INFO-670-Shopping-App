import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenWrapper from './ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { address, cartItems, total } = route.params || {};

  const paymentMethods = [
    { id: 'applePay', label: 'Apple Pay', icon: 'logo-apple' },
    { id: 'paypal', label: 'PayPal', icon: 'logo-paypal' },
    { id: 'creditCard', label: 'Credit Card', icon: 'card' },
    { id: 'debitCard', label: 'Debit Card', icon: 'card-outline' },
  ];

  const handleContinue = () => {
    if (selectedMethod) {
      navigation.navigate('OrderConfirmation', { address, cartItems, total, paymentMethod: selectedMethod });
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Select Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[styles.methodCard, selectedMethod === method.id && styles.selectedMethod]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <Ionicons name={method.icon} size={24} color={selectedMethod === method.id ? '#14B8A6' : '#6B7280'} />
            <Text style={[styles.methodLabel, selectedMethod === method.id && styles.selectedLabel]}>
              {method.label}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          disabled={!selectedMethod}
        >
          <Text style={styles.continueText}>Continue to Confirmation</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A2E44',
    textAlign: 'center',
    marginVertical: 15,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectedMethod: {
    borderColor: '#14B8A6',
    borderWidth: 2,
  },
  methodLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 10,
  },
  selectedLabel: {
    color: '#14B8A6',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#14B8A6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PaymentScreen;