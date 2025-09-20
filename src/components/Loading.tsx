import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
export const Loading: React.FC = () => (
  <View style={styles.container}><ActivityIndicator size="large"/></View>
);
const styles = StyleSheet.create({ container: { flex:1, justifyContent:'center', alignItems:'center' } });