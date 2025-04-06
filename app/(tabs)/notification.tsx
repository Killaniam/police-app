import { ScrollView, ActivityIndicator, View } from 'react-native';
import React from 'react';
import NotificationCard from '@/components/NotificationCard';
import { FIREBASE_DB } from '@/firebase/firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const Notification = () => {
  // State to store list of notifications and loading status
  const [notificationList, setNotificationList] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // Initialize Firebase database instance
  const db = FIREBASE_DB;

  // Function to fetch notifications from Firebase
  const getNotifications = async () => {
    try {
      // Get reference to notifications collection
      const notificationsRef = collection(db, 'notifications');
      // Fetch all documents from notifications collection
      const querySnapshot = await getDocs(notificationsRef);
      // Array to store notification data
      const notifications: any = [];

      // Loop through documents and add to notifications array
      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
      // Update state with fetched notifications
      setNotificationList(notifications);
      // Set loading state to false after fetch completes
      setIsLoading(false);
      return notifications;
    } catch (error) {
      // Log error and set loading to false if fetch fails
      console.error('Error getting notifications:', error);
      setIsLoading(false);
      return [];
    }
  };

  // Effect hook to fetch notifications when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      getNotifications();
    }, [])
  );

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FBFBFB]">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render scrollable list of notification cards
  return (
    <ScrollView className="flex-1 px-4 bg-[#FBFBFB]">
      {/* Map through notifications and render NotificationCard for each */}
      {notificationList.map((notification) => {
        return (
          <NotificationCard
            title={notification.title}
            body={notification.message}
            key={notification.id}
          />
        );
      })}
    </ScrollView>
  );
};

export default Notification;
