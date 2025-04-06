import React from 'react';
import { Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import CustomHeader from '@/components/CustomHeader';
import emergency from '../../assets/images/emergency.png';

const TabLayout: React.FC = () => {
  return (
    <>
      {/* Main Tabs component with custom styling for the tab bar */}
      <Tabs
        screenOptions={{
          // Configuration options for tab bar appearance and colors
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
        {/* Home tab screen with custom header and icon */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'HOME',
            header: () => <CustomHeader />,
            tabBarIcon: ({ color }) => (
              // Container for home tab icon and label
              <View className="flex flex-col items-center justify-center">
                {/* Home icon using AntDesign icon set */}
                <AntDesign name="home" size={22} color={color} />
                {/* Text label for home tab */}
                <Text className="w-full text-white" style={{ color: color }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        {/* Emergency tab screen with custom header and icon */}
        <Tabs.Screen
          name="emergency"
          options={{
            title: 'EMERGENCY',
            header: () => <CustomHeader />,
            tabBarIcon: ({ color }) => (
              // Container for emergency tab icon and label
              <View className="flex flex-col items-center justify-center">
                {/* Emergency icon using custom image */}
                <Image
                  source={emergency}
                  style={{ width: 30, height: 22, resizeMode: 'contain' }}
                />
                {/* Text label for emergency tab */}
                <Text className="w-full text-white" style={{ color: color }}>
                  Emergency
                </Text>
              </View>
            ),
          }}
        />
        {/* Notification tab screen with custom header and icon */}
        <Tabs.Screen
          name="notification"
          options={{
            title: 'Notification',
            header: () => <CustomHeader />,
            tabBarIcon: ({ color }) => (
              // Container for notification tab icon and label
              <View className="flex flex-col items-center justify-center">
                {/* Notification icon using Ionicons icon set */}
                <Ionicons name="notifications-outline" size={22} />
                {/* Text label for notification tab */}
                <Text className="w-full text-white" style={{ color: color }}>
                  Notifications
                </Text>
              </View>
            ),
          }}
        />
        {/* Settings tab screen with custom header and icon */}
        <Tabs.Screen
          name="setting"
          options={{
            title: 'SETTING',
            header: () => <CustomHeader />,
            tabBarIcon: ({ color }) => (
              // Container for settings tab icon and label
              <View className="flex flex-col items-center justify-center">
                {/* Settings icon using Ionicons icon set */}
                <Ionicons name="settings-outline" size={22} color={color} />
                {/* Text label for settings tab */}
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
