import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import icons from '@/constants/icons';
import { Link, RelativePathString, useRouter } from 'expo-router';
import { FIREBASE_AUTH } from '@/firebase/firebase.config';

const Settings: React.FC = () => {
  // Initialize router for navigation
  const router = useRouter();
  // State to track notification toggle status
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  // Function to toggle notification switch state
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // Function to handle user logout and redirect to sign-in page
  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
    router.push('/sign-in');
  };

  // Function to handle navigation to different screens
  const handleNavigate = (path: string) => {
    router.push(path as RelativePathString);
  };

  return (
    // Main container with safe area and styling
    <SafeAreaView className="flex-1 px-4 bg-[#FBFBFB]">
      {/* Settings header text */}
      <Text className="text-lg font-bold">Settings</Text>
      {/* Notifications section with toggle switch */}
      <View className="flex flex-row justify-between items-center border-b border-[#8cb6dd] pt-5 pb-4">
        {/* Notifications icon and label container */}
        <View className="flex flex-row justify-between items-center">
          {/* Notifications bell icon */}
          <Ionicons name="notifications-outline" size={24} />
          {/* Notifications label */}
          <Text className="ps-3 text-xl">Notifications</Text>
        </View>
        {/* Toggle switch for notifications */}
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#000' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {/* Help desk section container */}
      <View className="pt-5">
        {/* Help desk header */}
        <Text className="text-xl pb-5">Help Desk</Text>
        <View>
          {/* Privacy policy button */}
          <TouchableOpacity
            onPress={() => handleNavigate('/privacy')}
            activeOpacity={0.5}
            className="flex flex-row items-center border-b border-[#8cb6dd] pb-4 mb-4"
          >
            {/* Privacy policy icon */}
            <Image source={icons.privacy} style={{ width: 24, height: 24 }} />
            {/* Privacy policy text */}
            <Text className="ps-3 text-xl">Privacy Policy</Text>
          </TouchableOpacity>
          {/* FAQ button */}
          <TouchableOpacity
            onPress={() => handleNavigate('/questions')}
            activeOpacity={0.5}
            className="flex flex-row items-center border-b border-[#8cb6dd] pb-4"
          >
            {/* FAQ icon */}
            <Image source={icons.question} style={{ width: 24, height: 24 }} />
            {/* FAQ text */}
            <Text className="ps-3 text-xl">Frequently Asked Questions</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Logout button */}
      <TouchableOpacity
        onPress={handleLogout}
        activeOpacity={0.5}
        className="mt-8 flex flex-row items-center border-b border-[#8cb6dd] pb-4"
      >
        {/* Logout icon */}
        <Image source={icons.logout} style={{ width: 24, height: 24 }} />
        {/* Logout text */}
        <Text className="ps-3 text-xl">Logout</Text>
      </TouchableOpacity>
      {/* Social media links section */}
      <View className="mt-8">
        {/* Social media section header */}
        <Text className="mb-4 text-lg">Stay connected</Text>
        {/* Social media icons container */}
        <View className="flex flex-row items-center">
          {/* Facebook link */}
          <Link href="https://www.facebook.com/" asChild>
            {/* Facebook icon */}
            <Feather
              name="facebook"
              size={24}
              color={'white'}
              style={{ backgroundColor: '#0279b0', padding: 8, marginRight: 8, borderRadius: 6 }}
            />
          </Link>
          {/* Instagram link */}
          <Link href="https://www.instagram.com/" asChild>
            {/* Instagram icon */}
            <Feather
              name="instagram"
              size={24}
              color={'white'}
              style={{ backgroundColor: '#0279b0', padding: 8, borderRadius: 6 }}
            />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
