import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, label, keyboardType }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 6,
    fontWeight: '600',
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    fontSize: 16,
    color: '#212529',
  },
});

export default CustomInput;
