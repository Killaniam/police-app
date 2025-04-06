import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { Link, useRouter } from 'expo-router';
import FormField from '@/components/FormField';
import PoliceLogo from '../../assets/images/police-logo.png';
import { FIREBASE_AUTH } from '../../firebase/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn: React.FC = (): JSX.Element => {
  // Initialize router and Firebase auth instance
  const router = useRouter();
  const auth = FIREBASE_AUTH;

  // Initialize state for form inputs and loading status
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Handle form submission with Firebase authentication
  const onSubmit = async (): Promise<void> => {
    // Set loading state to true when submission starts
    setLoading(true);
    // Validate if all fields are filled
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all the fields');
      setLoading(false);
      return;
    }
    try {
      // Attempt to sign in user with Firebase
      await signInWithEmailAndPassword(auth, form.email, form.password);
      // Show success message and redirect to home
      alert('Sign in successful');
      router.replace('/home');
    } catch (error) {
      // Handle and display any authentication errors
      console.error(error);
      Alert.alert('Sign In Failed');
    } finally {
      // Reset loading state regardless of outcome
      setLoading(false);
    }
  };

  return (
    <View className="bg-[#FBFBFB] h-full">
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
        <View className="w-full min-h-[90vh] justify-center px-4">
          <Image source={PoliceLogo} style={styles.image} resizeMode="cover" />

          <Text className="text-center text-2xl font-bold text-black mt-2 mb-8">Sign in</Text>

          <FormField
            label="Email"
            placeholder="Email"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            isRequired
          />

          <FormField
            label="Password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            isRequired
          />

          <PrimaryButton
            disabled={loading}
            label={loading ? '...' : 'Sign in'}
            handlePress={onSubmit}
          />

          <View className="flex justify-center items-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-regular">Don&apos;t have an account?</Text>

            <Link
              href="/sign-up"
              className="text-lg font-semibold text-black border-b-2 border-[#151569]"
            >
              Signup
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignIn;

// Styles for the police logo image
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 'auto',
  },
});
