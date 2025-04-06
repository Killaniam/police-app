import React from 'react';
import PageLayout from '@/components/PageLayout';
import CustomHeader from '@/components/CustomHeader';
import { View } from 'react-native';
import Accordion from '@/components/Accordian';

const Questions = () => {
  return (
    <PageLayout>
      <CustomHeader isBackIcon title="Frequently Asked Questions" path="/setting" />
      <View className="h-full px-4 bg-white">
        <Accordion />
      </View>
    </PageLayout>
  );
};

export default Questions;
