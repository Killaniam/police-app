import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

const AuthLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#003092" barStyle="light-content" />
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default AuthLayout;
