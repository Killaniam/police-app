import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { emergencyData } from '../api/data/dummy-data';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebase/firebase.config';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import axios from 'axios';
import * as Location from 'expo-location';
import { usePushNotifications } from '@/utils/usePushNotifications';

const Emergency: React.FC = () => {
  // State to store user data including username, phone and blood group
  const [userData, setUserData] = useState<{
    username: string;
    phone: string;
    bloodGroup: string;
  } | null>(null);
  // State to store user's current address
  const [address, setAddress] = useState<string | null>(null);
  // Initialize Firebase authentication and database instances
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  // Get Expo push notification token for sending notifications
  const { expoPushToken } = usePushNotifications();
  console.log(expoPushToken);

  // Effect hook to get and set user's current location
  useEffect(() => {
    async function getCurrentLocation() {
      // Request permission to access device location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      // Get current geographical coordinates
      const { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        const { latitude, longitude } = coords;

        // Convert coordinates to human readable address
        const response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (response) {
          const { name, region, country } = response[0];
          setAddress(`${name}, ${region}, ${country}`);
        }
      }
    }
    getCurrentLocation();
  }, []);

  // Effect hook to fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      // Get current authenticated user
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        // Set user data if document exists
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUserData({
            username: data.displayName,
            phone: data.phone,
            bloodGroup: data.bloodGroup,
          });
        } else {
          console.log('error');
        }
      }
    };

    fetchUserData();
  }, [auth, db]);

  // Function to check if user has exceeded notification limit (2 per hour)
  const checkNotificationLimit = async (userId: string): Promise<boolean> => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      where('timestamp', '>', Timestamp.fromDate(oneHourAgo))
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.size < 2;
  };

  // Function to add notification to Firestore database
  const addNotification = async (title: string, message: string, userId: string) => {
    try {
      await addDoc(collection(db, 'notifications'), {
        title: title,
        message: message,
        userId: userId,
        read: false,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding notification: ', error);
    }
  };

  // Function to handle emergency card click events
  const handleCardClick = async (title: string) => {
    // Check if required data is available
    if (!userData || !address) {
      Alert.alert('Error', 'User data or address is not available. Please try again.');
      return;
    }

    // Verify user authentication
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      // Check notification limit before proceeding
      const canSendNotification = await checkNotificationLimit(userId);

      if (!canSendNotification) {
        Alert.alert('Error', 'You can only send 2 notifications per hour. Please try again later.');
        return;
      }

      // Construct notification message with user details
      const notificationBody = `${title} request from ${userData.username} at address ${address}. Please contact ${userData.phone}. ${userData.bloodGroup ? `Blood Group required is ${userData.bloodGroup}` : ''}`;

      // Send push notification using Expo's API
      await axios.post(
        'https://exp.host/--/api/v2/push/send',
        {
          to: 'ExponentPushToken[jPaM0-EPhZzLVf-I17pJdO]',
          sound: 'default',
          title: title,
          body: notificationBody,
        },
        {
          headers: {
            Accept: 'application/json',
            Host: 'exp.host',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
        }
      );

      // Store notification in Firestore
      await addNotification(title, notificationBody, userId);

      alert('Success, Data submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error, Failed to submit data. Please try again.');
    }
  };

  // Debug log to show current user data
  console.log(userData);

  // Return JSX for rendering emergency services UI
  return (
    <SafeAreaView className="px-10 bg-[#FBFBFB]">
      <Text className="text-center text-3xl text-[#033990] font-bold pt-10 pb-6">
        Quick Access to Emergency Services
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-col mt-8 mx-2 mb-24">
          {emergencyData?.map((item) => (
            // Touchable card component for each emergency service
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleCardClick(item.title)}
              key={item.title}
              className={`flex flex-col items-center px-4 py-14 mb-10 bg-gray-200 rounded-lg shadow`}
            >
              <Image source={item.icon} className="w-[66px] h-[60px] mb-4" />

              <Text className="text- text-black font-medium">{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Emergency;
