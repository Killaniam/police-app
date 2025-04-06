import { Text, View } from 'react-native';
import React from 'react';

type NotificationCardProps = {
  title: string;
  body: string;
};

const NotificationCard: React.FC<NotificationCardProps> = ({ title, body }) => {
  return (
    <View className="flex flex-row bg-gray-200 p-4 my-4 rounded-md">
      <View className="flex-1 ms-4">
        <Text className="w-fit text-black font-bold">{title}</Text>
        <Text className="w-fit text-black">{body}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;
