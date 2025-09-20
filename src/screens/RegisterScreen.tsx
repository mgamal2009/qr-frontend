import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {useTheme, colors} from '../theme/theme';


export default function RegisterScreen({navigation}: any) {
  const {scheme} = useTheme();
  const theme = colors[scheme || 'light'];
  const {signUp} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View style={[styles.card, {backgroundColor: theme.card}]}>
        <Text style={[styles.title, {color: theme.text}]}>Create account</Text>
        <TextInput placeholder="Email" placeholderTextColor="#999" style={[styles.input, {color: theme.text}]}
                   value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address'/>
        <TextInput placeholder="Password" placeholderTextColor="#999" style={[styles.input, {color: theme.text}]}
                   value={password} onChangeText={setPassword} secureTextEntry/>
        <TouchableOpacity onPress={() => signUp(email, password)}
                          style={[styles.loginBtn, {backgroundColor: theme.primary}]}>
          <Text style={{color: '#fff', fontWeight: '600'}}>Create</Text>
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