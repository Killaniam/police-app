import CustomHeader from '@/components/CustomHeader';
import PageLayout from '@/components/PageLayout';
import MapPage from '@/pages/map-page';
import React from 'react';

const PoliceStation = () => {
  return (
    <PageLayout>
      <CustomHeader isBackIcon title="Police Stations Nearby" path="/home" />
      <MapPage />
    </PageLayout>
  );
};

export default PoliceStation;
