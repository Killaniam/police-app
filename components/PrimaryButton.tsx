import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

// PrimaryButton component props
interface PrimaryButtonProps {
  label: string;
  handlePress: () => void;
  disabled?: boolean;
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, handlePress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className="bg-[#003092] border border-white min-w-[100%] min-h-[58px] rounded-md"
      disabled={disabled}
    >
      {disabled ? (
        <ActivityIndicator color="white" className="m-auto" />
      ) : (
        <Text className="text-center text-white m-auto text-[16px] font-bold">{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
