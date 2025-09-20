import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {useTheme, colors} from '../theme/theme';
import {Loading} from '../components/Loading';


export default function LoginScreen({navigation}: any) {
  const {scheme} = useTheme();
  const theme = colors[scheme || 'light'];
  const {signIn, loading} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  if (loading) return <Loading/>;
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                          style={[styles.container, {backgroundColor: theme.bg}]}>
      <View style={[styles.card, {backgroundColor: theme.card}]}>
        <Text style={[styles.title, {color: theme.text}]}>Welcome back</Text>
        <TextInput placeholder="Email" placeholderTextColor="#999" style={[styles.input, {color: theme.text}]}
                   value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address'/>
        <TextInput placeholder="Password" placeholderTextColor="#999" style={[styles.input, {color: theme.text}]}
                   value={password} onChangeText={setPassword} secureTextEntry/>
        <TouchableOpacity onPress={() => signIn(email, password)}
                          style={[styles.loginBtn, {backgroundColor: theme.primary}]}>
          <Text style={{color: '#fff', fontWeight: '600'}}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{color: theme.primary}}>Create
            account</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}><Text
            style={{color: theme.primary}}>Forgot?</Text></TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  title: {fontSize: 24, fontWeight: '700', marginBottom: 20},
  input: {borderWidth: 1, borderColor: '#e6e9ef', padding: 12, borderRadius: 8, marginBottom: 12},
  loginBtn: {padding: 12, borderRadius: 10, alignItems: 'center'},
  row: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}
});