import React, { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import CustomHeader from '@/components/CustomHeader';
import ReportIncidentFormPage from '@/pages/report-incident-form-page';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportIncidentForm: React.FC = () => {
  const [title, setTitle] = React.useState<string | null>(null);

  // Get the title from the memory of mobile device
  useEffect(() => {
    AsyncStorage.getItem('title').then((value) => {
      setTitle(value);
    });
  }, []);

  return (
    <PageLayout>
      <CustomHeader isBackIcon title={title} path="/report-incident" />
      <ReportIncidentFormPage title={title as string} />
    </PageLayout>
  );
};

export default ReportIncidentForm;
