import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

const ReportIncidentLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#3B82F6" barStyle="light-content" />
      <Stack>
        <Stack.Screen name="report-incident" options={{ headerShown: false }} />
        <Stack.Screen name="report-incident-form" options={{ headerShown: false }} />
        <Stack.Screen name="my-incident" options={{ headerShown: false }} />
        <Stack.Screen name="police-station" options={{ headerShown: false }} />
        <Stack.Screen name="notice" options={{ headerShown: false }} />
        <Stack.Screen name="privacy" options={{ headerShown: false }} />
        <Stack.Screen name="questions" options={{ headerShown: false }} />
        <Stack.Screen name="emergency-form" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default ReportIncidentLayout;
