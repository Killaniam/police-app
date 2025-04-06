import React, { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import CustomHeader from '@/components/CustomHeader';
import CyberBullyingPage from '@/pages/report-incident-form-page';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CyberBullying: React.FC = () => {
  const [title, setTitle] = React.useState<string | null>(null);

  // Get the title from the AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('title').then((value) => {
      setTitle(value);
    });
  }, []);

  return (
    <PageLayout>
      <CustomHeader isBackIcon title={title} path="/report-incident" />
      <CyberBullyingPage />
    </PageLayout>
  );
};

export default CyberBullying;
