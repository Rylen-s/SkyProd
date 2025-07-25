import React from 'react';
import { Link, Stack, useNavigation, useRouter } from 'expo-router';
import { StyleSheet, Button, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


export default function titleScreen({ navigation }: any) {

    return (
        // <SafeAreaView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{paddingVertical: 25, alignItems: 'center', fontSize: 24, fontWeight: 'bold', color: 'black' }}>WELCOME TO SKY PROD!</Text>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate('Signin')}
          />

        </View>
        // </SafeAreaView>
        
    )
}