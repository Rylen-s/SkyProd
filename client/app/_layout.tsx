import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Slot, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated';
import  TitleScreen from './titlescreen'
import  SigninScreen from './signinscreen'
import  Tabs from './Tabs/_layout'
import NotFound from './+not-found'
import { View } from 'react-native';
import { FIREBASE_AUTH } from '../../client/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  console.log('Hi in root2');
  const [user, setUser] = useState<User | null>(null);

  // 1) Subscribe once to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, setUser);
    return unsub;
  }, []);

  // 2) Whenever `user` changes, fetch a fresh token, set header, THEN call your API
  useEffect(() => {
    if (!user) {
      // signed out
      delete axios.defaults.headers.common['Authorization'];
      return;
    }

    ;(async () => {
      try {
        console.log('⚙️ Getting ID token…');
        const token = await user.getIdToken(true);
        console.log('🔥 Got token:', token.slice(0, 20) + '…');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (e) {
        console.warn('❌ Failed to fetch ID token', e);
        return;
      }

      // now that header is set, call your API
      try {
        const resp = await axios.get('http://localhost:8080/api');
        console.log('✅ API is reachable:', resp.data);
      } catch (err) {
        console.warn('🚫 API call failed:', err);
      }
    })();
  }, [user]);


    if (user){
      return (
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator>
            <Stack.Screen name="tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" component={NotFound} />
          </Stack.Navigator>
          </QueryClientProvider>
      
      )
    } 
    else{

  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator initialRouteName='Title'>
        <Stack.Screen name="Title" component={TitleScreen} options={{ headerShown: false} } />
        <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" component={NotFound} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </QueryClientProvider>

  );
  }
}
