import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import api from '../api/axios';
import {useTheme, colors} from '../theme/theme';


export default function ForgotPasswordScreen() {
  const {scheme} = useTheme();
  const theme = colors[scheme || 'light'];
  const [email, setEmail] = useState('');
  const submit = async () => {
    try {
      await api.post('/auth/forgot-password', {email});
      Alert.alert('If the email exists, a reset link was sent');
    } catch (e: any) {
      Alert.alert('Error', e?.response?.data?.error || e.message);
    }
  };
  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View style={[styles.card, {backgroundColor: theme.card}]}>
        <Text style={[styles.title, {color: theme.text}]}>Reset password</Text>
        <TextInput placeholder="Email" placeholderTextColor="#999" style={[styles.input, {color: theme.text}]}
                   value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address'/>
        <TouchableOpacity onPress={submit} style={[styles.loginBtn, {backgroundColor: theme.primary}]}>
          <Text style={{color: '#fff', fontWeight: '600'}}>Send reset link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4
  },
  title: {fontSize: 22, fontWeight: '700', marginBottom: 16},
  input: {borderWidth: 1, borderColor: '#e6e9ef', padding: 12, borderRadius: 8, marginBottom: 12},
  loginBtn: {padding: 12, borderRadius: 10, alignItems: 'center'}
});