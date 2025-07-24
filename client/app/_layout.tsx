import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated';
import  TitleScreen from './titlescreen'
import  SigninScreen from './signinscreen'
import  Tabs from './(tabs)/_layout'
import NotFound from './+not-found'
import { View } from 'react-native';
import { FIREBASE_AUTH } from '../../client/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  
  // outside and internal stacks
  


  const fetchAPI = async () => {
    try {
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.fruits);
    } catch (err){
      console.warn("API sketch failed: ",err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [])
  
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }
  // authorization
  const[user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // subscribe to auth state
    const unsub = onAuthStateChanged(FIREBASE_AUTH, (fbUser) => {
      setUser(fbUser);
    });
    return unsub;
  }, []);


    if (user){
      return (
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator>
            <Stack.Screen name="tabs" component={Tabs} options={{ headerShown: true }} />
            <Stack.Screen name="+not-found" component={NotFound} />
          </Stack.Navigator>
          </QueryClientProvider>
      
      )
    } 
    else{

  return (
    <QueryClientProvider client={queryClient}>
    <View>
      <Stack.Navigator initialRouteName='Title'>
        <Stack.Screen name="Title" component={TitleScreen} options={{ headerShown: false} } />
        <Stack.Screen name="Sign-in" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" component={NotFound} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
    </QueryClientProvider>

  );
  }
}
