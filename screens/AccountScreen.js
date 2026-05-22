import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const AccountScreen = ({ route, navigation }) => {
  const { username: initialUsername, email: initialEmail, phone: initialPhone, dob: initialDob } = route.params;
  
  const [currentUsername, setCurrentUsername] = useState(initialUsername);
  const [newUsername, setNewUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail || '');
  const [phone, setPhone] = useState(initialPhone || '');
  const [dob, setDob] = useState(initialDob || '');
  const [newPassword, setNewPassword] = useState('');

  const onUpdateProfile = async () => {
    if (!newUsername) {
      Alert.alert('Error', 'Username cannot be empty.');
      return;
    }
    
    try {
      if (newUsername !== currentUsername) {
        const existing = await SecureStore.getItemAsync(newUsername);
        if (existing) {
          Alert.alert('Error', 'Username is already taken. Please choose another one.');
          return;
        }
      }

      const storedDataString = await SecureStore.getItemAsync(currentUsername);
      let userData = { password: '', email: '', phone: '', dob: '' };
      
      if (storedDataString) {
        try {
          userData = JSON.parse(storedDataString);
        } catch(e) {
          userData.password = storedDataString; 
        }
      }
      
      if (newPassword) userData.password = newPassword;
      userData.email = email;
      userData.phone = phone;
      userData.dob = dob;

      if (newUsername !== currentUsername) {
        await SecureStore.setItemAsync(newUsername, JSON.stringify(userData));
        await SecureStore.deleteItemAsync(currentUsername);
        setCurrentUsername(newUsername);
      } else {
        await SecureStore.setItemAsync(currentUsername, JSON.stringify(userData));
      }
      
      Alert.alert(
        'Success', 
        'Profile updated successfully. Please log in again.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Cannot update profile.');
    }
  };

  const onDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete this account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync(currentUsername);
              Alert.alert('Success', 'Account has been deleted.');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              Alert.alert('Error', 'Cannot delete account.');
            }
          }
        }
      ]
    );
  };
  
  const onLogout = () => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Account Management</Text>
          <Text style={styles.subtitle}>Welcome, {currentUsername}!</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <CustomInput 
              label="Username"
              placeholder="Enter username" 
              value={newUsername} 
              setValue={setNewUsername} 
            />

            <CustomInput 
              label="Email Address"
              placeholder="Enter email" 
              value={email} 
              setValue={setEmail} 
              keyboardType="email-address"
            />
            
            <CustomInput 
              label="Phone Number"
              placeholder="Enter phone number" 
              value={phone} 
              setValue={setPhone} 
              keyboardType="phone-pad"
            />

            <CustomInput 
              label="Date of Birth"
              placeholder="DD/MM/YYYY" 
              value={dob} 
              setValue={setDob} 
            />
            
            <CustomInput 
              label="New Password (Leave blank to keep current)"
              placeholder="Enter new password" 
              value={newPassword} 
              setValue={setNewPassword} 
              secureTextEntry={true} 
            />
            
            <CustomButton text="Update Profile" onPress={onUpdateProfile} type="SECONDARY" />
          </View>
          
          <View style={styles.spacer} />
          
          <CustomButton text="Log Out" onPress={onLogout} type="TERTIARY" />
          <CustomButton text="Delete Account" onPress={onDeleteAccount} type="DANGER" />
        </View>
      </ScrollView>
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
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#28a745',
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#212529',
  },
  spacer: {
    marginVertical: 15,
  },
});

export default AccountScreen;
