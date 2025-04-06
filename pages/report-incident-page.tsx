import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RelativePathString, useRouter } from 'expo-router';
import { data } from '@/app/api/data/dummy-data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportIncidentPage: React.FC = () => {
  // Initialize router instance for navigation
  const router = useRouter();

  // Function that stores the selected incident title and navigates to the form page
  const handleNavigation = async (title: string) => {
    await AsyncStorage.setItem('title', title);
    router.replace('/report-incident-form' as RelativePathString);
  };

  return (
    // Main container view that holds the grid layout of incident cards
    <View style={styles.container}>
      {/* Maps through incident data to create a grid of touchable cards */}
      {data?.map((item, index) => (
        // Touchable wrapper for each incident card with reduced opacity on press
        <TouchableOpacity
          activeOpacity={0.7}
          key={index}
          onPress={() => handleNavigation(item.title)}
        >
          {/* Individual card container for each incident type */}
          <View key={index} style={styles.card}>
            {/* Icon representing the incident type */}
            <Image source={item.icon} style={styles.icon} />
            {/* Title text for the incident type */}
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ReportIncidentPage;

const styles = StyleSheet.create({
  // Container style for the main grid layout with flex properties and padding
  container: {
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#FBFBFB',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  // Style for individual incident cards with border and dimensions
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
  // Style for the incident type icons with specific dimensions
  icon: {
    width: 80,
    height: 70,
    resizeMode: 'contain',
  },
  // Style for the incident type title text
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#4a4a4a',
  },
});
