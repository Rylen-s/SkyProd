import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { useState, useEffect } from 'react';
import  CollapsibleCard  from '@/components/CollapsibleCard';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
// import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import { questyles } from '@/styles/questyles';
import type { Quest }  from '../../utils/types';
import axios from 'axios';
import { api } from '../../api'
import '../../components/ui/cartoonButton';
import { AnimatedCartoonButton } from '../../components/ui/cartoonButton';

export default function TabTwoScreen() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  
  async function loadQuests() {
      try {
        const res = await axios.get('http://localhost:8080/api/quests');
        // console.log('Gettin dem quests')
        setQuests(res.data);
      } catch (err) {
        console.error('Failed to load quests', err);
      }
    }

  useEffect(() => {
    loadQuests();
    
  }, []);

  const toggleCollapse = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const completeQuest = async (id: string) => {
    try {
      console.log('Deleting quest', id);
      const res = await api.delete(`http://localhost:8080/api/quests/${id}`);
      console.log('DELETE status', res.status);
      console.log('It work')
      setQuests(prev => prev.filter(q => q.id !== id));
      // loadQuests();
    } catch (err: any) {
      console.error('Failed to complete quest', err?.response?.status, err?.response?.data || err);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <FlatList
      data={quests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        renderItem={({ item }) => (
            <View>
                <CollapsibleCard  title={item.title} content={<><AnimatedCartoonButton onPress={() => completeQuest(item.id)} title="Quest Completed"/></>
            }>
                </CollapsibleCard>
            </View>
        )}
        
    />
    </ParallaxScrollView>
  );
}

// collapsed={!item.isExpanded}

 

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
