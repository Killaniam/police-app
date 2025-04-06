import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DropdownProps {
  label: string;
  options: string[];
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect, placeholder }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  // Handle Dropdown
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle Select Option
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setShowDropdown(false);
  };

  return (
    <View style={{ paddingHorizontal: 4, marginBottom: 16 }}>
      <Text style={{ fontSize: 16, color: '#151569', fontWeight: '500', paddingBottom: 6 }}>
        {label}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleDropdown}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 10,
        }}
      >
        <TextInput
          value={selectedOption || placeholder}
          style={{ flex: 1, color: '#000000', fontSize: 16, fontWeight: '500' }}
          editable={false}
          className="focus:outline-none"
        />
        <Ionicons name="chevron-down" size={20} />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {showDropdown && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 5,
            marginTop: 8,
            height: 200,
          }}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectOption(option)}
              style={{
                padding: 12,
                borderBottomWidth: index !== options.length - 1 ? 1 : 0,
                borderBottomColor: '#e5e7eb',
              }}
            >
              <Text style={{ color: 'gray' }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Dropdown;
