import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenWrapper from './ScreenWrapper';

const countries = [
  { label: 'United States', value: 'USA' },
  { label: 'India', value: 'India' },
  { label: 'Canada', value: 'Canada' },
];

const statesUSA = [
  { label: 'Alabama', value: 'Alabama' },
  { label: 'Alaska', value: 'Alaska' },
  { label: 'Arizona', value: 'Arizona' },
  { label: 'Arkansas', value: 'Arkansas' },
  { label: 'California', value: 'California' },
  { label: 'Colorado', value: 'Colorado' },
  { label: 'Connecticut', value: 'Connecticut' },
  { label: 'Delaware', value: 'Delaware' },
  { label: 'Florida', value: 'Florida' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Hawaii', value: 'Hawaii' },
  { label: 'Idaho', value: 'Idaho' },
  { label: 'Illinois', value: 'Illinois' },
  { label: 'Indiana', value: 'Indiana' },
  { label: 'Iowa', value: 'Iowa' },
  { label: 'Kansas', value: 'Kansas' },
  { label: 'Kentucky', value: 'Kentucky' },
  { label: 'Louisiana', value: 'Louisiana' },
  { label: 'Maine', value: 'Maine' },
  { label: 'Maryland', value: 'Maryland' },
  { label: 'Massachusetts', value: 'Massachusetts' },
  { label: 'Michigan', value: 'Michigan' },
  { label: 'Minnesota', value: 'Minnesota' },
  { label: 'Mississippi', value: 'Mississippi' },
  { label: 'Missouri', value: 'Missouri' },
  { label: 'Montana', value: 'Montana' },
  { label: 'Nebraska', value: 'Nebraska' },
  { label: 'Nevada', value: 'Nevada' },
  { label: 'New Hampshire', value: 'New Hampshire' },
  { label: 'New Jersey', value: 'New Jersey' },
  { label: 'New Mexico', value: 'New Mexico' },
  { label: 'New York', value: 'New York' },
  { label: 'North Carolina', value: 'North Carolina' },
  { label: 'North Dakota', value: 'North Dakota' },
  { label: 'Ohio', value: 'Ohio' },
  { label: 'Oklahoma', value: 'Oklahoma' },
  { label: 'Oregon', value: 'Oregon' },
  { label: 'Pennsylvania', value: 'Pennsylvania' },
  { label: 'Rhode Island', value: 'Rhode Island' },
  { label: 'South Carolina', value: 'South Carolina' },
  { label: 'South Dakota', value: 'South Dakota' },
  { label: 'Tennessee', value: 'Tennessee' },
  { label: 'Texas', value: 'Texas' },
  { label: 'Utah', value: 'Utah' },
  { label: 'Vermont', value: 'Vermont' },
  { label: 'Virginia', value: 'Virginia' },
  { label: 'Washington', value: 'Washington' },
  { label: 'West Virginia', value: 'West Virginia' },
  { label: 'Wisconsin', value: 'Wisconsin' },
  { label: 'Wyoming', value: 'Wyoming' },
];


const statesIndia = [
  { label: 'Maharashtra', value: 'Maharashtra' },
  { label: 'Gujarat', value: 'Gujarat' },
  { label: 'Karnataka', value: 'Karnataka' },
];

const CheckoutScreen = () => {
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems, total } = route.params || {};

  const handleInputChange = (field, value) => {
    setAddress({ ...address, [field]: value });
  };

  const handleProceedToPayment = () => {
    const { fullName, street, city, state, postalCode, country } = address;
    if (!fullName || !street || !city || !state || !postalCode || !country) {
      Alert.alert('Missing Information', 'Please fill out all fields before proceeding.');
      return;
    }

    navigation.navigate('PaymentScreen', { address, cartItems, total });
  };

  const stateOptions =
    address.country === 'India' ? statesIndia :
    address.country === 'USA' ? statesUSA :
    [];

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Checkout</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={address.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
            placeholder="Enter your full name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={styles.input}
            value={address.street}
            onChangeText={(text) => handleInputChange('street', text)}
            placeholder="Enter street address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={address.city}
            onChangeText={(text) => handleInputChange('city', text)}
            placeholder="Enter city"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Country</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => handleInputChange('country', value)}
            value={address.country}
            placeholder={{ label: 'Select a country...', value: '' }}
            items={countries}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>State</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => handleInputChange('state', value)}
            value={address.state}
            placeholder={{ label: 'Select a state...', value: '' }}
            items={stateOptions}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.input}
            value={address.postalCode}
            onChangeText={(text) => handleInputChange('postalCode', text)}
            placeholder="Enter postal code"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToPayment}>
          <Text style={styles.proceedText}>Proceed to Payment</Text>
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  proceedButton: {
    backgroundColor: '#14B8A6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  proceedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    marginBottom: 5,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
    marginBottom: 5,
  },
};

export default CheckoutScreen;
