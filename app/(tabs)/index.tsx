import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={[
      styles.container, 
      { backgroundColor: colorScheme === 'light' ? '#f0f0f0' : '#353636' },
      ]}>
      <ThemedText style={styles.title}>Welcome</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});