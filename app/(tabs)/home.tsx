import { View } from 'react-native';
import React from 'react';
import Card from '@/components/Card';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 px-4 bg-[#FBFBFB]">
      <View>
        <Card />
      </View>
    </SafeAreaView>
  );
};

export default Home;
