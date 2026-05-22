import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, label, keyboardType, variant = 'default' }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, variant === 'minimal' && styles.labelMinimal]}>{label}</Text>}
      <View style={[styles.inputContainer, variant === 'minimal' && styles.inputContainerMinimal]}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={[styles.input, variant === 'minimal' && styles.inputMinimal]}
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
  labelMinimal: {
    color: '#6f42c1',
    fontWeight: '700',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#6f42c1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  inputContainerMinimal: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#6f42c1',
    borderRadius: 0,
    paddingHorizontal: 4,
    paddingVertical: 10,
    shadowOpacity: 0,
    elevation: 0,
  },
  input: {
    fontSize: 16,
    color: '#212529',
  },
  inputMinimal: {
    fontSize: 18,
    color: '#000',
  },
});

export default CustomInput;
