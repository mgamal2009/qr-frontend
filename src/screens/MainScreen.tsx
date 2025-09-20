import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Platform} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useAuth} from '../contexts/AuthContext';
import {useTheme, colors} from '../theme/theme';
import {useInterval} from '../hooks/useInterval';
import api from '../api/axios';
import io from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';
import {useNetwork} from '../hooks/useNetwork';


export default function MainScreen() {
  const {user, signOut} = useAuth();
  const {scheme, toggle} = useTheme();
  const theme = colors[scheme || 'light'];
  const [uuid, setUuid] = useState<string | null>(null);
  const isConnected = useNetwork();
  const socketRef = useRef<any>(null);


// fetch initial
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/qr/current');
        if (!mounted) return;
        setUuid(res.data.uuid);
        await SecureStore.setItemAsync('last_uuid', res.data.uuid);
      } catch (e: any) {
        const cached = await SecureStore.getItemAsync('last_uuid');
        if (cached) setUuid(cached);
        else Alert.alert('Unable to fetch QR');
      }
    })();
    return () => {
      mounted = false;
    }
  }, []);

  // live socket
  useEffect(() => {
    const tokenPromise = SecureStore.getItemAsync('token');
    tokenPromise.then(token => {
      if (!token) return;
      const socket = io((process.env.EXPO_PUBLIC_API_BASE || 'http://localhost:4000'), {auth: {token}});
      socket.on('connect', () => console.log('socket connected'));
      socket.on('qr:update', (d: any) => {
        setUuid(d.uuid);
        SecureStore.setItemAsync('last_uuid', d.uuid);
      });
      socket.on('disconnect', () => console.log('socket disconnected'));
      socketRef.current = socket;
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);


// fallback: poll every 60s
  useInterval(async () => {
    try {
      const res = await api.get('/qr/current');
      setUuid(res.data.uuid);
      await SecureStore.setItemAsync('last_uuid', res.data.uuid);
    } catch (e) { /* ignore */
    }
  }, 60_000);


  return (
    <View style={[styles.container, {backgroundColor: theme.bg}]}>
      <View style={[styles.card, {backgroundColor: theme.card}]}>
        <Text style={[styles.title, {color: theme.text}]}>Your rotating QR</Text>
        {uuid ? (
          <View style={styles.qrWrap}>
            <QRCode value={uuid} size={220}/>
          </View>
        ) : <Text style={{color: theme.text}}>Loading...</Text>}
        <View style={styles.rowBetween}>
          <Text style={{color: theme.text}}>Connected: {isConnected ? 'Yes' : 'No'}</Text>
          <TouchableOpacity onPress={() => toggle()}><Text style={{color: theme.primary}}>Toggle
            theme</Text></TouchableOpacity>
        </View>
        <View style={styles.rowBetween}>
          <TouchableOpacity onPress={() => signOut()} style={[styles.action, {backgroundColor: theme.primary}]}><Text
            style={{color: '#fff'}}>Logout</Text></TouchableOpacity>
          <TouchableOpacity onPress={async () => {
            const val = await SecureStore.getItemAsync('last_uuid');
            Alert.alert('Last UUID', val || 'none');
          }} style={[styles.action]}><Text style={{color: theme.text}}>Last</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  card: {
    width: '92%',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center'
  },
  title: {fontSize: 20, fontWeight: '700', marginBottom: 14},
  qrWrap: {padding: 10, backgroundColor: '#fff', borderRadius: 12, marginBottom: 12},
  rowBetween: {flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 12},
  action: {padding: 10, borderRadius: 10, alignItems: 'center'}
});