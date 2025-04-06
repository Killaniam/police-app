import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <View style={styles.outerView} className="h-full">
      {/* Inner white container view with rounded corners and padding */}
      <View style={styles.innerView} className="h-full rounded-md">
        {/* Scrollable container that hides the scroll indicator */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Main content container with bottom margin */}
          <View className="h-full" style={{ marginBottom: 110 }}>
            {/* Main title text for the privacy policy */}
            <Text className="text-black text-lg font-medium">
              Nepal Police Mobile App: Privacy Policy
            </Text>
            {/* Container for effective date section with flex row layout */}
            <View className="flex flex-row items-center py-5">
              {/* Label text for effective date */}
              <Text className="text-black text-lg font-medium">Effective date:</Text>
              {/* Actual date text with left padding */}
              <Text className="ps-1">January 1, 2025</Text>
            </View>
            {/* Welcome message text with justified alignment */}
            <Text style={{ textAlign: 'justify' }}>
              Welcome to the Nepal Police mobile application (&apos;Service&apos;), operated by
              Nepal Police Headquarters (&apos;us,&apos; &apos;we,&apos; or &apos;our&apos;), the
              law enforcement agency of Nepal. Our Privacy Policy is designed to transparently
              communicate the information we collect, why we collect it, and how it is utilized.
            </Text>
            {/* Section container for personal and sensitive data */}
            <View>
              {/* Section heading for personal and sensitive data */}
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Personal and Sensitive User Data
              </Text>
              {/* Description text for personal and sensitive data section */}
              <Text style={{ textAlign: 'justify' }}>
                Nepal Police values user privacy and collects only essential personal and sensitive
                data required for the app&apos;s core functionality, with user consent. This
                includes personally identifiable information, authentication details, device
                location, and more.
              </Text>
            </View>
            {/* Section container for collection of personal information */}
            <View>
              {/* Section heading for personal information collection */}
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Collection of Personal Information:
              </Text>
              {/* Description text for personal information collection */}
              <Text style={{ textAlign: 'justify' }}>
                We receive and store personal information provided through the user registration
                form. Basic information like name, phone number, address, and email may be collected
                for updates, information sharing, and service provision. Additional information may
                be collected when reporting incidents or providing feedback.
              </Text>
            </View>
            {/* Section container for use of personal information */}
            <View>
              {/* Section heading for personal information usage */}
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Use of Personal Information:
              </Text>
              {/* Description text for personal information usage */}
              <Text style={{ textAlign: 'justify' }}>
                Personal information is used to provide updates, information, and services. It helps
                in improving products and services while understanding user needs.
              </Text>
            </View>
            {/* Section container for application usage information */}
            <View>
              {/* Section heading for application usage */}
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                When Using the Application:
              </Text>
              {/* Description text for application usage information */}
              <Text>
                Information such as mobile device ID, IP address, mobile operating system, and usage
                patterns are collected in an aggregated manner to analyze and enhance service
                quality.
              </Text>
            </View>
            {/* Section container for camera and storage information */}
            <View>
              {/* Section heading for camera and storage */}
              <Text className="text-black text-lg font-medium pt-5 pb-1">Camera and Storage:</Text>
              {/* Description text for camera and storage usage */}
              <Text style={{ textAlign: 'justify' }}>
                The app utilizes the camera and storage to capture, store, and submit optional
                supporting evidence, enhancing the reporting process.
              </Text>
            </View>
            {/* Section container for sensitive data usage */}
            <View>
              {/* Section heading for sensitive data usage */}
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Sensitive User Data Usage:
              </Text>
              {/* Description text for sensitive data usage */}
              <Text style={{ textAlign: 'justify' }}>
                Permissions like location, storage, and call are requested for specific
                functionalities: Location: Reporting incident location for a swift response.
                Storage: Uploading and downloading attachments. Call: Emergency calls and contacting
                police units.
              </Text>
            </View>
            {/* Section container for privacy policy changes */}
            <View>
              {/* Section heading for privacy policy changes */}
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Changes to This Privacy Policy
              </Text>
              {/* Description text for privacy policy changes */}
              <Text style={{ textAlign: 'justify' }}>
                We may update our Privacy Policy, and users will be informed through email or
                prominent notices on the Service before changes take effect. Review this Privacy
                Policy periodically for updates, as changes become effective upon posting.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// Styles object containing styling for outer and inner view containers
const styles = StyleSheet.create({
  // Style for the outer container with light gray background
  outerView: {
    backgroundColor: '#f5f5f5',
  },
  // Style for the inner white container with margins and padding
  innerView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 40,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});

export default PrivacyPolicy;
