/* eslint-disable @typescript-eslint/no-explicit-any */
import { FIREBASE_AUTH } from '@/firebase/firebase.config';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const MyIncidentPage = () => {
  const [incidents, setIncidents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const auth = FIREBASE_AUTH;
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const db = getFirestore();

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

  const getUsername = async () => {
    const username = await getUserDoc(auth!.currentUser!.uid);
    if (username) {
      return username;
    } else {
      return 'unknown';
    }
  };

  React.useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/incidents`);
        await getUsername().then((username) => {
          const filtered = response.data.incidents.filter(
            (incident: any) => incident.submittedBy === username
          );

          setIncidents(filtered);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]} className="h-full p-4">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container} className="h-full p-4">
      {incidents.length > 0 ? (
        <FlatList
          style={{ width: '100%' }}
          data={incidents}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: any) => (
            <View style={{ padding: 10, margin: 10, backgroundColor: '#fff', borderRadius: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 5 }}>
                {item.incidentType}
              </Text>
              <Text style={{ color: '#4A4A4A', marginBottom: 5 }}>Suspects: {item.suspects}</Text>
              <Text style={{ color: '#4A4A4A', marginBottom: 5 }}>
                Suspects Details: {item.suspectsDetails}
              </Text>
              <Text style={{ color: '#4A4A4A', marginBottom: 5 }}>
                Incident Details: {item.incidentDetails}
              </Text>
              <Text style={{ color: '#6B6B6B', marginBottom: 5 }}>Date: {item.time}</Text>
              <Text style={{ color: '#6B6B6B', marginBottom: 5 }}>
                Submitted By: {item.submittedBy}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color:
                    item.resolved === 'Open'
                      ? 'green'
                      : item.resolved === 'Closed'
                        ? 'red'
                        : '#abab11',
                }}
              >
                Status: {item.resolved ? 'Resolved' : 'Pending'}
              </Text>
              {item.comment && (
                <Text className="font-bold" style={{ color: 'red', marginBottom: 5 }}>
                  POLICE COMMENT: {item.comment}
                </Text>
              )}
            </View>
          )}
        />
      ) : (
        <View style={{ paddingTop: 20 }} className="flex flex-row justify-center">
          <EvilIcons name="exclamation" size={28} color="#6B6B6B" />
          <Text style={{ fontSize: 18, color: '#6B6B6B', paddingLeft: 4 }}>No incidents found</Text>
        </View>
      )}
    </View>
  );
};

export default MyIncidentPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
