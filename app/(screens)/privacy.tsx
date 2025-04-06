import React from 'react';
import PageLayout from '@/components/PageLayout';
import CustomHeader from '@/components/CustomHeader';
import PrivacyPolicy from '@/pages/privacy-policy';

const Privacy = () => {
  return (
    <PageLayout>
      <CustomHeader isBackIcon title="Privacy Policy" path="/setting" />
      <PrivacyPolicy />
    </PageLayout>
  );
};

export default Privacy;
