import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';


export function useNetwork() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  useEffect(() => {
    const sub = NetInfo.addEventListener(state => setIsConnected(state.isConnected));
    NetInfo.fetch().then(s => setIsConnected(s.isConnected));
    return () => sub();
  }, []);
  return isConnected;
}