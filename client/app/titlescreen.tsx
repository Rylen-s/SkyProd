import React from 'react';
import { Link, Stack, useNavigation } from 'expo-router';
import { StyleSheet, Button, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function titleScreen({ navigation }: any) {
    

    return (
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{alignItems: 'center', fontSize: 24, fontWeight: 'bold', color: 'white' }}>SKY PROD MOTHA FUCKA!</Text>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate('Sign-in')} // Navigate to your main screen
          />
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Sign-up')} // Navigate to your main screen
          />
        </View>
        
    )
}