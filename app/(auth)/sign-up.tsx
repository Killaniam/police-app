/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const router = useRouter();
  // Form state
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    bloodGroup: '',
  });
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  // Handle form submission
  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    if (!form.email || !form.password || !form.username || !form.phone) {
      alert('Please fill all the fields');
      return;
    } else {
      try {
        setLoading(true);

        // Step 1: Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        const user = userCredential.user;
        const uid = user.uid;

        router.push('/sign-in');
        // Step 2: Add user data to Firestore
        await setDoc(doc(db, 'users', uid), {
          email: form.email,
          displayName: form.username,
          bloodGroup: form.bloodGroup,
          phone: form.phone,
          timestamp: serverTimestamp(), // Use Firestore's serverTimestamp
        });
        console.log(user);
        // Step 3: Show success message and redirect
        alert('Sign up successful!');
      } catch (error: any) {
        // Step 4: Handle errors
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
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View className="bg-[#FBFBFB] h-full">
      <KeyboardAvoidingView behavior="padding">
        <View className="w-full min-h-[90vh] justify-center px-4">
          <Image source={PoliceLogo} style={styles.image} resizeMode="cover" />
          <Text className="text-center text-2xl font-semibold text-black mt-2 mb-8">Sign up</Text>
          <View className="mb-4">
            <FormField
              label="Username"
              placeholder="Username"
              value={form.username}
              handleChangeText={(text) => setForm({ ...form, username: text })}
              isRequired
            />
            <FormField
              label="Phone"
              placeholder="Phone number"
              value={form.phone}
              handleChangeText={(text) => setForm({ ...form, phone: text })}
              isRequired
            />
            <FormField
              label="Blood Group"
              placeholder="Blood Group"
              value={form.bloodGroup}
              handleChangeText={(text) => setForm({ ...form, bloodGroup: text })}
              isRequired
            />
            <FormField
              label="Email"
              placeholder="Email address"
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
          </View>
          <PrimaryButton
            disabled={loading}
            label={loading ? '...' : 'Sign up'}
            handlePress={onSubmit}
          />
          <View className="flex justify-center items-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-regular">Already have an account?</Text>
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

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 'auto',
  },
});
