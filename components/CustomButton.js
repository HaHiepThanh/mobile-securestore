import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress, text, type = 'PRIMARY' }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        styles[`container_${type}`],
        pressed && styles.pressed,
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`]
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#6f42c1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  container_PRIMARY: {
    backgroundColor: '#6f42c1',
  },
  container_SECONDARY: {
    backgroundColor: '#f8f9fa',
    borderColor: '#6f42c1',
    borderWidth: 2,
    shadowOpacity: 0,
    elevation: 0,
  },
  container_DANGER: {
    backgroundColor: '#dc3545',
  },
  container_TERTIARY: {
    padding: 8,
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.5,
  },
  text_SECONDARY: {
    color: '#6f42c1',
  },
  text_TERTIARY: {
    color: '#6c757d',
    fontWeight: '600',
  },
  text_DANGER: {
    color: 'white',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});

export default CustomButton;
