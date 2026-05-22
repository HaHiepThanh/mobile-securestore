import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPressed = async () => {
    console.log('--- LOGIN PRESSED ---');
    console.log('Username:', username);
    
    if (!username || !password) {
      console.log('Validation failed: Missing username or password');
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }
    
    try {
      console.log('Attempting to read from SecureStore for key:', username);
      const storedDataString = await SecureStore.getItemAsync(username);
      
      if (storedDataString) {
        try {
          const userData = JSON.parse(storedDataString);
          if (userData.password === password) {
            console.log('Password match! Navigating to Account...');
            setPassword('');
            navigation.navigate('Account', { 
              username, 
              email: userData.email, 
              phone: userData.phone,
              dob: userData.dob
            });
          } else {
            console.log('Password mismatch!');
            Alert.alert('Error', 'Incorrect password.');
          }
        } catch (e) {
          // Fallback if data was stored without JSON (from old version)
          if (storedDataString === password) {
             console.log('Legacy user login success');
             Alert.alert('Notice', 'Legacy account version. Please update your profile information.');
             setPassword('');
             navigation.navigate('Account', { username, email: '', phone: '', dob: '' });
          } else {
             Alert.alert('Error', 'Invalid data or incorrect password.');
          }
        }
      } else {
        console.log('User not found!');
        Alert.alert('Error', 'Account does not exist. Please register.');
      }
    } catch (error) {
      console.error('SecureStore Error during login:', error);
      Alert.alert('Error', 'Cannot access SecureStore data.');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        
        <CustomInput 
          label="Username"
          placeholder="Enter your username" 
          value={username} 
          setValue={setUsername} 
        />
        
        <CustomInput 
          label="Password"
          placeholder="Enter your password" 
          value={password} 
          setValue={setPassword} 
          secureTextEntry={true} 
        />
        
        <CustomButton text="Login" onPress={onLoginPressed} />
        
        <CustomButton 
          text="Don't have an account? Register" 
          onPress={() => navigation.navigate('Register')} 
          type="TERTIARY" 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f4fdf6',
  },
  container: {
    padding: 24,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#28a745',
    marginVertical: 40,
    letterSpacing: 0.5,
  },
});

export default LoginScreen;
