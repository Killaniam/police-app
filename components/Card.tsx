import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { RelativePathString, useRouter } from 'expo-router';
import { cardItems } from '@/app/api/data/dummy-data';

const Card: React.FC = () => {
  const router = useRouter();

  // Function to handle navigation
  const handleNavigation = (path?: string) => {
    if (path) {
      router.push(`/${path}` as RelativePathString);
    }
  };

  return (
    <FlatList
      data={cardItems}
      keyExtractor={(item) => item.title}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleNavigation(item.path)} activeOpacity={0.7}>
          <View>
            <View className="flex flex-row items-center bg-gray-200 space-x-2 px-4 py-6 rounded-lg mb-10">
              {(item.name === 'clipboard-list-outline' || item.name === 'police-station') && (
                <MaterialCommunityIcons name={item.name} size={36} color="#284280" />
              )}
              {item.name === 'report' && <Octicons name={item.name} size={36} color="#284280" />}
              {item.name === 'notification' && (
                <AntDesign name={item.name} size={36} color="#284280" />
              )}
              <Text className="text-2xl font-bold text-black ps-2">{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      ListHeaderComponent={() => (
        <Text className="text-center text-3xl text-[#033990] font-bold py-10">
          &quot;Truth Service and Security&quot;
        </Text>
      )}
    />
  );
};

export default Card;
