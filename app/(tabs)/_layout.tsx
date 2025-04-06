import React from 'react';
import { Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import CustomHeader from '@/components/CustomHeader';
import emergency from '../../assets/images/emergency.png';

const TabLayout: React.FC = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#03045c',
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: '#3674B5',
            height: 70,
            paddingTop: 16,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'HOME',
            header: () => <CustomHeader />,
            tabBarIcon: ({ color }) => (
              <View className="flex flex-col items-center justify-center">
                <AntDesign name="home" size={22} color={color} />
                <Text className="w-full text-white" style={{ color: color }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="emergency"
          options={{
            title: 'EMERGENCY',
            header: () => <CustomHeader />,
            tabBarIcon: ({ color }) => (
              <View className="flex flex-col items-center justify-center">
                <Image
                  source={emergency}
                  style={{ width: 30, height: 22, resizeMode: 'contain' }}
                />
                <Text className="w-full text-white" style={{ color: color }}>
                  Emergency
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: 'Notification',
            header: () => <CustomHeader />,
            tabBarIcon: ({ color }) => (
              <View className="flex flex-col items-center justify-center">
                <Ionicons name="notifications-outline" size={22} />
                <Text className="w-full text-white" style={{ color: color }}>
                  Notifications
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: 'SETTING',
            header: () => <CustomHeader />,
            tabBarIcon: ({ color }) => (
              <View className="flex flex-col items-center justify-center">
                <Ionicons name="settings-outline" size={22} color={color} />
                <Text className="w-full text-white" style={{ color: color }}>
                  Settings
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
