import { Link, Stack, useNavigation } from 'expo-router';
import { StyleSheet, Button, View, Text, ActivityIndicator, KeyboardAvoidingView, TextInput } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react'; 
import { FIREBASE_AUTH } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';




export default function signinScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email,password);
        console.log(response)
      }
      catch(error: any){
        alert('Sign in Failed: ' + error.message);

      } finally {
        setLoading(false)
      }
    }

    const signUp = async () => {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, email,password);
        console.log(response)
      }
      catch(error: any){
        alert('Sign in Failed: ' + error.message);

      } finally {
        setLoading(false)
      }
    }

    return (
        
        <View style={styles.container}>
          <KeyboardAvoidingView behavior='padding'>
          {/* <Text style={{ alignItems: 'center', fontSize: 40, fontWeight: 'bold', color: 'white' }}>Sign In</Text> */}
          <TextInput style={styles.input} placeholder="Email" autoCapitalize = "none" value = {email} onChangeText={(text) => setEmail(text)} ></TextInput>
          <TextInput secureTextEntry={true}style={styles.input} placeholder="Password" value = {password} onChangeText={(text) => setPassword(text)} ></TextInput>
          
          { loading ? <ActivityIndicator size= 'large' color = '#0000ff'/>
          : ( <> 
          <Button
            title="Login"
            onPress={signIn} />
          <Button
            title="Create Account"
            onPress={signUp} />
          </> 
          
) }
  </KeyboardAvoidingView>
</View>
  
    )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding : 10,
    backgroundColor: '#fff'
  }
})