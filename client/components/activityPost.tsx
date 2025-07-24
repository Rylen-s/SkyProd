import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useActivities } from '../hooks/useActivities';


export default function ActivityForm() {
  const [text, setText] = useState('');
  const { addActivity } = useActivities();

  return (
    <View>
      <TextInput
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
