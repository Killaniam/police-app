import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import icons from '@/constants/icons';
import { Link, RelativePathString, useRouter } from 'expo-router';
import { FIREBASE_AUTH } from '@/firebase/firebase.config';

const Settings: React.FC = () => {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  // toggle switch
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // handle logout
  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
    router.push('/sign-in');
  };

  // handle navigate
  const handleNavigate = (path: string) => {
    router.push(path as RelativePathString);
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-[#FBFBFB]">
      <Text className="text-lg font-bold">Settings</Text>
      <View className="flex flex-row justify-between items-center border-b border-[#8cb6dd] pt-5 pb-4">
        <View className="flex flex-row justify-between items-center">
          <Ionicons name="notifications-outline" size={24} />
          <Text className="ps-3 text-xl">Notifications</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#000' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View className="pt-5">
        <Text className="text-xl pb-5">Help Desk</Text>
        <View>
          <TouchableOpacity
            onPress={() => handleNavigate('/privacy')}
            activeOpacity={0.5}
            className="flex flex-row items-center border-b border-[#8cb6dd] pb-4 mb-4"
          >
            <Image source={icons.privacy} style={{ width: 24, height: 24 }} />
            <Text className="ps-3 text-xl">Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigate('/questions')}
            activeOpacity={0.5}
            className="flex flex-row items-center border-b border-[#8cb6dd] pb-4"
          >
            <Image source={icons.question} style={{ width: 24, height: 24 }} />
            <Text className="ps-3 text-xl">Frequently Asked Questions</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        activeOpacity={0.5}
        className="mt-8 flex flex-row items-center border-b border-[#8cb6dd] pb-4"
      >
        <Image source={icons.logout} style={{ width: 24, height: 24 }} />
        <Text className="ps-3 text-xl">Logout</Text>
      </TouchableOpacity>
      <View className="mt-8">
        <Text className="mb-4 text-lg">Stay connected</Text>
        <View className="flex flex-row items-center">
          <Link href="https://www.facebook.com/" asChild>
            <Feather
              name="facebook"
              size={24}
              color={'white'}
              style={{ backgroundColor: '#0279b0', padding: 8, marginRight: 8, borderRadius: 6 }}
            />
          </Link>
          <Link href="https://www.instagram.com/" asChild>
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
