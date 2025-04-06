import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RelativePathString, useRouter } from 'expo-router';
import { data } from '@/app/api/data/dummy-data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportIncidentPage: React.FC = () => {
  const router = useRouter();

  // Function to handle navigation
  const handleNavigation = async (title: string) => {
    await AsyncStorage.setItem('title', title);
    router.replace('/report-incident-form' as RelativePathString);
  };

  return (
    <View style={styles.container}>
      {/* Container for the grid layout */}
      {data?.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={index}
          onPress={() => handleNavigation(item.title)}
        >
          <View key={index} style={styles.card}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ReportIncidentPage;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#FBFBFB',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  card: {
    width: 110,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#003263',
    borderRadius: 8,
    marginBottom: 22,
  },
  icon: {
    width: 80,
    height: 70,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#4a4a4a',
  },
});
