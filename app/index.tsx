import { Image, Text, View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { useRouter } from 'expo-router';
import PoliceLogo from '../assets/images/police-logo.png';
import { FIREBASE_AUTH } from '@/firebase/firebase.config';

const App: React.FC = () => {
  const router = useRouter();

  const auth = FIREBASE_AUTH;

  const handleGetStarted = () => {
    if (auth.currentUser) {
      router.push('/home');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <View className="bg-[#003092] items-center justify-center flex-1 px-4">
      <StatusBar backgroundColor="#3B82F6" barStyle="light-content" />
      <Image source={PoliceLogo} style={styles.image} />
      <View className="pt-4 pb-6">
        <Text className="text-center text-white text-4xl font-bold mb-2">Hamro Prahari</Text>
        <Text className="text-center text-white text-xl font-bold px-8">
          Safeguarding Communities with Professional Excellence
        </Text>
      </View>
      <PrimaryButton label="Get Started with login" handlePress={handleGetStarted} />
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
