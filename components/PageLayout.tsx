import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type LayoutProps = {
  children: React.ReactNode;
};

const PageLayout: React.FC<LayoutProps> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default PageLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6',
  },
});
