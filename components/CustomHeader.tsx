import { Image, Text, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import PoliceLogo from '../assets/images/police-logo.png';
import { RelativePathString, useRouter } from 'expo-router';

// Custom header props
type CustomHeaderProps = {
  title?: string | null;
  isBackIcon?: boolean;
  path?: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ isBackIcon, title, path }) => {
  const router = useRouter();
  const handleBack = () => {
    router.push(path as RelativePathString);
  };
  return (
    <View
      className={`h-[70px] bg-[#FBFBFB] flex flex-row items-center ${!isBackIcon ? 'justify-between' : ''} px-4`}
    >
      {isBackIcon ? (
        <AntDesign
          name="arrowleft"
          size={24}
          color={'#3b82f5'}
          className="bg-white rounded-full p-2"
          onPress={handleBack}
        />
      ) : (
        <Image source={PoliceLogo} style={{ width: 50, height: 50 }} />
      )}
      {isBackIcon && (
        <Text className="flex-1 text-center text-black text-2xl font-bold pe-6">{title}</Text>
      )}
      {/* {!isBackIcon && <Ionicons name='person-circle-outline' size={35} color='white' />} */}
    </View>
  );
};

export default CustomHeader;
