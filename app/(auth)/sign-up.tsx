import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import FormField from '@/components/FormField';
import PrimaryButton from '@/components/PrimaryButton';
import PoliceLogo from '../../assets/images/police-logo.png';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebase/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const SignUp: React.FC = (): JSX.Element => {
  // Initialize router for navigation
  const router = useRouter();
  // Initialize form state with empty values for user registration fields
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    bloodGroup: '',
  });
  // State to track loading status during form submission
  const [loading, setLoading] = useState(false);

  // Initialize Firebase authentication and database instances
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  // Handle form submission and user registration
  const onSubmit = async (): Promise<void> => {
    // Set loading state to true when submission starts
    setLoading(true);
    // Validate required fields
    if (!form.email || !form.password || !form.username || !form.phone) {
      alert('Please fill all the fields');
      return;
    } else {
      try {
        setLoading(true);

        // Create new user account in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        const user = userCredential.user;
        const uid = user.uid;

        // Navigate to sign-in page after successful registration
        router.push('/sign-in');
        // Store additional user data in Firestore database
        await setDoc(doc(db, 'users', uid), {
          email: form.email,
          displayName: form.username,
          bloodGroup: form.bloodGroup,
          phone: form.phone,
          timestamp: serverTimestamp(),
        });
        // Log user object for debugging
        console.log(user);
        // Show success message to user
        alert('Sign up successful!');
      } catch (error: any) {
        // Handle different types of authentication errors
        let errorMessage = 'Sign up failed. Please try again.';
        switch (error?.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'The email address is already in use.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The email address is invalid.';
            break;
          case 'auth/weak-password':
            errorMessage = 'The password is too weak.';
            break;
          default:
            console.error('Sign-up error:', error);
        }
        // Display error message to user
        alert(errorMessage);
      } finally {
        // Reset loading state after operation completes
        setLoading(false);
      }
    }
  };

  return (
    // Main container with light background
    <View className="bg-[#FBFBFB] h-full">
      {/* Keyboard avoiding view to handle input fields */}
      <KeyboardAvoidingView behavior="padding">
        {/* Content container with padding and centering */}
        <View className="w-full min-h-[90vh] justify-center px-4">
          {/* Police logo image */}
          <Image source={PoliceLogo} style={styles.image} resizeMode="cover" />
          {/* Sign up header text */}
          <Text className="text-center text-2xl font-semibold text-black mt-2 mb-8">Sign up</Text>
          {/* Form fields container */}
          <View className="mb-4">
            {/* Username input field */}
            <FormField
              label="Username"
              placeholder="Username"
              value={form.username}
              handleChangeText={(text) => setForm({ ...form, username: text })}
              isRequired
            />
            {/* Phone number input field */}
            <FormField
              label="Phone"
              placeholder="Phone number"
              value={form.phone}
              handleChangeText={(text) => setForm({ ...form, phone: text })}
              isRequired
            />
            {/* Blood group input field */}
            <FormField
              label="Blood Group"
              placeholder="Blood Group"
              value={form.bloodGroup}
              handleChangeText={(text) => setForm({ ...form, bloodGroup: text })}
              isRequired
            />
            {/* Email input field */}
            <FormField
              label="Email"
              placeholder="Email address"
              value={form.email}
              handleChangeText={(text) => setForm({ ...form, email: text })}
              isRequired
            />
            {/* Password input field */}
            <FormField
              label="Password"
              placeholder="Password"
              value={form.password}
              handleChangeText={(text) => setForm({ ...form, password: text })}
              isRequired
            />
          </View>
          {/* Sign up button with loading state */}
          <PrimaryButton
            disabled={loading}
            label={loading ? '...' : 'Sign up'}
            handlePress={onSubmit}
          />
          {/* Login link container */}
          <View className="flex justify-center items-center pt-5 flex-row gap-2">
            {/* Login prompt text */}
            <Text className="text-lg text-black font-regular">Already have an account?</Text>
            {/* Login link */}
            <Link
              href="/sign-in"
              className="text-lg font-semibold text-black border-b-2 border-[#151569]"
            >
              Login
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

// Styles for the police logo image
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 'auto',
  },
});
