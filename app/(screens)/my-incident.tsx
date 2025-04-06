import React from 'react';
import PageLayout from '@/components/PageLayout';
import CustomHeader from '@/components/CustomHeader';
import MyIncidentPage from '@/pages/my-incident-page';

const MyIncident = () => {
  return (
    <PageLayout>
      <CustomHeader title="My Incident" path="/home" isBackIcon />
      <MyIncidentPage />
    </PageLayout>
  );
};

export default MyIncident;
