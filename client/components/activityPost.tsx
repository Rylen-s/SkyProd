import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, TextInput, Button } from 'react-native';
import { useActivities } from '../hooks/useActivities';
import  Styles  from '../styles/uistyles'


export default function ActivityForm() {
  const [text, setText] = useState('');
  const { addActivity } = useActivities();

  return (
    <View>
      <TextInput
        style={Styles.input}
        placeholder="What did you do today?"
        value={text}
        onChangeText={setText}
      />
      <Button
        title="Log Activity"
        onPress={() => {
          addActivity.mutate(text);
          setText('');
        }}
      />
    </View>
  );
}
