import React from 'react';
import PageLayout from '@/components/PageLayout';
import CustomHeader from '@/components/CustomHeader';
import ReportIncidentPage from '@/pages/report-incident-page';

const ReportIncident: React.FC = () => {
  return (
    <PageLayout>
      <CustomHeader isBackIcon title="Report Incident" path="/home" />
      <ReportIncidentPage />
    </PageLayout>
  );
};

export default ReportIncident;
