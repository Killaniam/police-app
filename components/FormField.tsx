import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// FormField component props
interface FormFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  isRequired?: boolean;
  tooltip?: string;
  handleChangeText: (text: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  placeholder,
  isRequired,
  tooltip,
  handleChangeText,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <View>
      <View className="flex-row items-center relative">
        <Text className="text-base text-[#151569] font-medium pb-[6px]">
          {label}
          {isRequired && <Text className="text-red-700 text-xl font-bold"> *</Text>}
        </Text>
        {tooltip && (
          <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)} style={{ marginLeft: 4 }}>
            <Ionicons name="information-circle-outline" size={16} color="#151569" />
          </TouchableOpacity>
        )}
        {showTooltip && tooltip && (
          <View className="absolute top-8 left-0 bg-[#155E95] rounded-md p-2 z-[9999]">
            <Text className="text-white text-sm">{tooltip}</Text>
          </View>
        )}
      </View>
      <View className="px-3 w-full mb-4 h-14 rounded-[10px] border-black-200  bg-gray-300 border-none flex flex-row items-center">
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor="#000000"
          secureTextEntry={label === 'Password' && !showPassword}
          className="h-full flex-1 text-black font-semibold text-base"
        />
        {label === 'Password' && (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <Ionicons name="eye-outline" size={20} color="000000" />
            ) : (
              <Ionicons name="eye-off-outline" size={20} color="00000" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
