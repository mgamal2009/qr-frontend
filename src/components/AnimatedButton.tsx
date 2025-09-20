import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { SlideInUp } from 'react-native-reanimated';


export const AnimatedButton: React.FC<{ title: string; onPress: () => void; style?: any }> = ({ title, onPress, style }) => (
  <Animated.View entering={SlideInUp.duration(250)} style={style}>
    <TouchableOpacity onPress={onPress} style={btnStyles.btn}>
      <Text style={btnStyles.text}>{title}</Text>
    </TouchableOpacity>
  </Animated.View>
);
const btnStyles = StyleSheet.create({ btn: { backgroundColor:'#2563eb', padding:14, borderRadius:10, alignItems:'center' }, text: { color:'#fff', fontWeight:'600' } });