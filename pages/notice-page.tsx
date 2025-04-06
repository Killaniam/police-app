import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormField from '@/components/FormField';
import axios from 'axios';

const NoticePage = () => {
  // State for search input text
  const [searchParam, setSearchParam] = useState('');
  // State to store notices data from API
  const [notices, setNotices] = useState([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // Base URL from environment variables
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  // Effect hook to fetch notices data on component mount
  useEffect(() => {
    // Async function to fetch notices from API
    const fetchNotices = async () => {
      try {
        // GET request to fetch notices
        const response = await axios.get(`${BASE_URL}/notices`);
        // Update notices state with response data
        setNotices(response.data.notices);
      } catch (error) {
        // Log error if fetch fails
        console.error('Error fetching incidents:', error);
      } finally {
        // Set loading to false when done
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Filter notices based on search parameter
  const filteredNotices = notices.filter((notice: any) =>
    notice.title.toLowerCase().includes(searchParam.toLowerCase())
  );

  return (
    // Main container view with full height and padding
    <View className="h-full px-4" style={{ backgroundColor: '#FBFBFB' }}>
      {/* Search input field component */}
      <FormField
        placeholder="Search..."
        value={searchParam}
        handleChangeText={(text) => setSearchParam(text)}
      />
      {/* Container for notices list with bottom margin */}
      <View style={{ marginBottom: 160 }}>
        {/* Conditional rendering based on loading state */}
        {isLoading ? (
          // Loading spinner centered in view
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          // List of notices
          <FlatList
            data={filteredNotices}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: any) => (
              // Individual notice item container
              <View
                style={{
                  marginTop: 25,
                  paddingBottom: 14,
                  paddingHorizontal: 10,
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 10,
                }}
              >
                {/* Notice title */}
                <Text style={{ fontWeight: 'semibold', fontSize: 16, paddingBottom: 4 }}>
                  {item.title}
                </Text>
                {/* Notice description */}
                <Text style={{ color: 'black', fontSize: 15 }}>{item.description}</Text>
                {/* Notice timestamp */}
                <Text style={{ color: 'gray', fontSize: 14 }}>
                  {new Date(item.updatedAt).toLocaleString()}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default NoticePage;
