import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegisterPressed = async () => {
    console.log('--- REGISTER PRESSED ---');
    console.log('Register Username:', username);
    
    if (!username || !email || !phone || !nickname || !password || !confirmPassword) {
      console.log('Validation failed: Missing fields');
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      console.log('Validation failed: Passwords do not match');
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    
    try {
      console.log('Checking if user exists in SecureStore...');
      const existingUser = await SecureStore.getItemAsync(username);
      
      if (existingUser) {
        console.log('User already exists!');
        Alert.alert('Error', 'Username already exists.');
        return;
      }
      
      console.log('Saving user to SecureStore...');
      const userData = {
        password,
        email,
        phone,
        nickname
      };
      await SecureStore.setItemAsync(username, JSON.stringify(userData));
      console.log('User saved successfully.');
      
      Alert.alert('Success', 'Account created successfully! Please log in.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('SecureStore Error during register:', error);
      Alert.alert('Error', 'Cannot create account in SecureStore.');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          
          <CustomInput 
            label="Username"
            placeholder="Enter your username" 
            value={username} 
            setValue={setUsername} 
          />
          
          <CustomInput 
            label="Email Address"
            placeholder="Enter your email" 
            value={email} 
            setValue={setEmail} 
            keyboardType="email-address"
          />
          
          <CustomInput 
            label="Phone Number"
            placeholder="Enter your phone number" 
            value={phone} 
            setValue={setPhone} 
            keyboardType="phone-pad"
          />

          <CustomInput 
            label="Nickname"
            placeholder="Enter your nickname" 
            value={nickname} 
            setValue={setNickname} 
            keyboardType="default"
          />
          
          <CustomInput 
            label="Password"
            placeholder="Enter your password" 
            value={password} 
            setValue={setPassword} 
            secureTextEntry={true} 
          />
          
          <CustomInput 
            label="Confirm Password"
            placeholder="Re-enter your password" 
            value={confirmPassword} 
            setValue={setConfirmPassword} 
            secureTextEntry={true} 
          />
          
          <CustomButton text="Register" onPress={onRegisterPressed} />
          
          <CustomButton 
            text="Already have an account? Login" 
            onPress={() => navigation.navigate('Login')} 
            type="TERTIARY" 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8f4fd',
  },
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#6f42c1',
    marginVertical: 30,
    letterSpacing: 0.5,
  },
});

export default RegisterScreen;
