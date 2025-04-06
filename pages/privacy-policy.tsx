import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <View style={styles.outerView} className="h-full">
      <View style={styles.innerView} className="h-full rounded-md">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="h-full" style={{ marginBottom: 110 }}>
            <Text className="text-black text-lg font-medium">
              Nepal Police Mobile App: Privacy Policy
            </Text>

            <View className="flex flex-row items-center py-5">
              <Text className="text-black text-lg font-medium">Effective date:</Text>
              <Text className="ps-1">January 1, 2025</Text>
            </View>

            <Text style={{ textAlign: 'justify' }}>
              Welcome to the Nepal Police mobile application (&apos;Service&apos;), operated by
              Nepal Police Headquarters (&apos;us,&apos; &apos;we,&apos; or &apos;our&apos;), the
              law enforcement agency of Nepal. Our Privacy Policy is designed to transparently
              communicate the information we collect, why we collect it, and how it is utilized.
            </Text>

            <View>
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Personal and Sensitive User Data
              </Text>
              <Text style={{ textAlign: 'justify' }}>
                Nepal Police values user privacy and collects only essential personal and sensitive
                data required for the app&apos;s core functionality, with user consent. This
                includes personally identifiable information, authentication details, device
                location, and more.
              </Text>
            </View>

            <View>
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Collection of Personal Information:
              </Text>
              <Text style={{ textAlign: 'justify' }}>
                We receive and store personal information provided through the user registration
                form. Basic information like name, phone number, address, and email may be collected
                for updates, information sharing, and service provision. Additional information may
                be collected when reporting incidents or providing feedback.
              </Text>
            </View>

            <View>
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Use of Personal Information:
              </Text>
              <Text style={{ textAlign: 'justify' }}>
                Personal information is used to provide updates, information, and services. It helps
                in improving products and services while understanding user needs.
              </Text>
            </View>

            <View>
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                When Using the Application:
              </Text>
              <Text>
                Information such as mobile device ID, IP address, mobile operating system, and usage
                patterns are collected in an aggregated manner to analyze and enhance service
                quality.
              </Text>
            </View>

            <View>
              <Text className="text-black text-lg font-medium pt-5 pb-1">Camera and Storage:</Text>
              <Text style={{ textAlign: 'justify' }}>
                The app utilizes the camera and storage to capture, store, and submit optional
                supporting evidence, enhancing the reporting process.
              </Text>
            </View>

            <View>
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Sensitive User Data Usage:
              </Text>
              <Text style={{ textAlign: 'justify' }}>
                Permissions like location, storage, and call are requested for specific
                functionalities: Location: Reporting incident location for a swift response.
                Storage: Uploading and downloading attachments. Call: Emergency calls and contacting
                police units.
              </Text>
            </View>

            <View>
              <Text className="text-black text-lg font-medium pt-5 pb-1">
                Changes to This Privacy Policy
              </Text>
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

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#f5f5f5',
  },
  innerView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 40,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});

export default PrivacyPolicy;
