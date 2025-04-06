import { ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import FormField from '@/components/FormField';
import PrimaryButton from '@/components/PrimaryButton';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { FIREBASE_AUTH } from '@/firebase/firebase.config';
import axios from 'axios';
import FileDropdown from '@/components/FileDropdown';
import * as Location from 'expo-location';

type ReportIncidentFormPageTypes = {
  title?: string;
};

const ReportIncidentFormPage: React.FC<ReportIncidentFormPageTypes> = ({ title }) => {
  // State variables for managing image upload and loading state
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // State object for managing form input values
  const [form, setForm] = useState({
    suspects: '',
    suspectsDetails: '',
    incidentDetails: '',
    time: '',
  });

  // API base URL from environment variables
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  // Initialize Firebase services
  const db = getFirestore();
  const auth = FIREBASE_AUTH;

  // Function to retrieve user document from Firestore database
  const getUserDoc = async (userId: string) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const username = userData.displayName;
        return username;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      return null;
    }
  };

  // Function to get current user's username
  const getUsername = async () => {
    const username = await getUserDoc(auth!.currentUser!.uid);
    if (username) {
      return username;
    } else {
      return 'unknown';
    }
  };

  // Function to get user's current location and address
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      return {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        address: address[0] ? `${address[0].street}, ${address[0].city}, ${address[0].region}` : '',
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  };

  // Function to handle form submission and create incident report
  const handlePress = async () => {
    try {
      setLoading(true);
      const location = await getCurrentLocation();
      if (!location) {
        alert('Unable to get current location');
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/incidents/create-incident`,
        {
          incidentType: title,
          submittedBy: await getUsername(),
          suspects: form.suspects,
          suspectsDetails: form.suspectsDetails,
          incidentDetails: form.incidentDetails,
          time: form.time,
          image: imageBase64,
          location: location,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // Reset form state after successful submission
        setForm({
          suspects: '',
          suspectsDetails: '',
          incidentDetails: '',
          time: '',
        });
        setSelectedFile('');
        setUploadedFile(null);
        setLoading(false);
        alert('Incident reported successfully');
      }
    } catch (error) {
      console.error('Error creating incident:', error);
      alert(
        'Incident Report failed. Please remember that image size limit is less than 100kB and max report submission is 3 per hour.'
      );
      throw error;
    }
  };

  return (
    // ScrollView container with styling for the form
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FBFBFB', paddingHorizontal: 20, paddingVertical: 30 }}
    >
      {/* Form field for suspect names */}
      <FormField
        label="Name of suspect(s)"
        value={form.suspects}
        placeholder="Enter suspect name(s)"
        handleChangeText={(text) => setForm({ ...form, suspects: text })}
        tooltip="Enter the full name(s) of the person(s) involved in the incident"
      />
      {/* Form field for suspect details */}
      <FormField
        isRequired
        label="Details of the suspect(s)"
        value={form.suspectsDetails}
        placeholder="Enter suspect details"
        handleChangeText={(text) => setForm({ ...form, suspectsDetails: text })}
        tooltip="Provide physical description, clothing, or any distinguishing characteristics"
      />
      {/* Form field for incident details */}
      <FormField
        isRequired
        label="Details of the incident"
        value={form.incidentDetails}
        placeholder="Enter incident details"
        handleChangeText={(text) => setForm({ ...form, incidentDetails: text })}
        tooltip="Describe what happened, where it occurred, and any relevant context"
      />
      {/* Form field for incident time */}
      <FormField
        isRequired
        label="Time"
        value={form.time}
        placeholder="Enter Time"
        handleChangeText={(text) => setForm({ ...form, time: text })}
        tooltip="Specify when the incident occurred (e.g., 3:30 PM on July 1, 2023)"
      />
      {/* Component for file upload functionality */}
      <FileDropdown
        label="Upload Documents"
        setImageBase64={setImageBase64}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        tooltip="Upload any relevant photos or documents related to the incident"
      />
      {/* Display image size limit warning */}
      <View>
        <Text>Please ensure that the image size is below 100KB.</Text>
      </View>
      {/* Submit button for the form */}
      <PrimaryButton disabled={loading} label="Report" handlePress={handlePress} />
    </ScrollView>
  );
};

export default ReportIncidentFormPage;
