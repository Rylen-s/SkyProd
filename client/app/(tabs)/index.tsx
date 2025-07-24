import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import  UIStyles  from '../../styles/uistyles'
import { HelloWave } from '../../components/HelloWave';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import ActivityForm from '../../components/activityPost';
import { useActivities } from '../../hooks/useActivities';

import React from 'react';

export default function HomeScreen() {
  const { data: acts, isLoading } = useActivities();
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">What did we accomplish today!!</ThemedText>
        {/* <TextInput placeholder='Enter details here' placeholderTextColor="#999" style = {UIStyles.input} onChangeText={newText => setNotes(newText)}
        defaultValue={notes}></TextInput> */}
      </ThemedView>
      <View style={{ flex: 1, padding: 16 }}>
      <ActivityForm />
      {isLoading ? (
        <Text>Loading…</Text>
      ) : (
        <FlatList
          data={acts}
          keyExtractor={a => String(a.id)}
          renderItem={({ item }) => (
            <Text>{item.created_at}: {item.description}</Text>
          )}
        />
      )}
    </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
