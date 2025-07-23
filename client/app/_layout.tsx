import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated';
import  TitleScreen from './titlescreen'
import  SigninScreen from './signinscreen'
import  Tabs from './(tabs)/_layout'
import NotFound from './+not-found'
import { View } from 'react-native';
import { FIREBASE_AUTH } from '@/client/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function RootLayout() {
  
  const Stack = createNativeStackNavigator();
  
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }
  const[user, setUser] = useState<User | null>(null);


  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user); 
      setUser(user); 
    });
  }, [])


    if (user){
      return (
        
          <Stack.Navigator>
            <Stack.Screen name="tabs" component={Tabs} options={{ headerShown: true }} />
            <Stack.Screen name="+not-found" component={NotFound} />
          </Stack.Navigator>
      
      )
    } 
    else{

  return (
    <View>
      <Stack.Navigator initialRouteName='Title'>
        <Stack.Screen name="Title" component={TitleScreen} options={{ headerShown: false} } />
        <Stack.Screen name="Sign-in" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" component={NotFound} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
  );
  }
}
