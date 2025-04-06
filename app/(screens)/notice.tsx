import React from 'react';
import PageLayout from '@/components/PageLayout';
import CustomHeader from '@/components/CustomHeader';
import NoticePage from '@/pages/notice-page';

const Notice = () => {
  return (
    <PageLayout>
      <CustomHeader title="Notice / Alerts" path="/home" isBackIcon />
      <NoticePage />
    </PageLayout>
  );
};

export default Notice;
