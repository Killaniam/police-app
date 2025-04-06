/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollView, ActivityIndicator, View } from 'react-native';
import React from 'react';
import NotificationCard from '@/components/NotificationCard';
import { FIREBASE_DB } from '@/firebase/firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const Notification = () => {
  const [notificationList, setNotificationList] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const db = FIREBASE_DB;

  const getNotifications = async () => {
    try {
      const notificationsRef = collection(db, 'notifications');
      const querySnapshot = await getDocs(notificationsRef);
      const notifications: any = [];

      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });
      setNotificationList(notifications);
      setIsLoading(false);
      return notifications;
    } catch (error) {
      console.error('Error getting notifications:', error);
      setIsLoading(false);
      return [];
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getNotifications();
    }, [])
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FBFBFB]">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-4 bg-[#FBFBFB]">
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
