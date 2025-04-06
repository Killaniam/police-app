import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CategoryProps {
  item: { id: number; label: string };
  onPress: () => void;
}

const Category = ({ item, onPress }: CategoryProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="my-3 bg-white"
      style={{ height: 40, borderRadius: 8, marginRight: 10 }}
    >
      <Text style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default Category;
