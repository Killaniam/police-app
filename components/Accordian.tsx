import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View className="mb-4 border-b border-gray-300">
      <TouchableOpacity
        onPress={toggleAccordion}
        className="flex-row justify-between items-center pb-5"
      >
        <Text className="text-lg font-medium">{title}</Text>
        <AntDesign name={isOpen ? 'up' : 'down'} size={18} />
      </TouchableOpacity>
      {isOpen && <View className="pb-5">{children}</View>}
    </View>
  );
};

const Accordion = () => {
  return (
    <View className="p-4 mt-8">
      <AccordionItem title="Do I need to register in the app to report an incident?">
        <Text>
          No, it is not mandatory to register in app to report an incident. However, there are
          additional features that you can access if you register such as follow-up the reported
          incident, panic mode and many more. Therefore, we highly recommend that you do.
        </Text>
      </AccordionItem>
      <AccordionItem title="How to access the police personnel related features in app? (For police personnel only)">
        <Text>
          You need to login in app using your PMIS code and password to access the police related
          features. If you have any problem regarding the PMIS login, please contact PMIS section,
          Police Headquarters at 01-4411210 (extension 548). For detail information about PMIS login
          / password, refer to User guide section of the app.
        </Text>
      </AccordionItem>
    </View>
  );
};

export default Accordion;
