/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormField from '@/components/FormField';
import axios from 'axios';

const NoticePage = () => {
  const [searchParam, setSearchParam] = useState('');
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/notices`);
        setNotices(response.data.notices);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = notices.filter((notice: any) =>
    notice.title.toLowerCase().includes(searchParam.toLowerCase())
  );

  return (
    <View className="h-full px-4" style={{ backgroundColor: '#FBFBFB' }}>
      <FormField
        placeholder="Search..."
        value={searchParam}
        handleChangeText={(text) => setSearchParam(text)}
      />
      <View style={{ marginBottom: 160 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={filteredNotices}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: any) => (
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
                <Text style={{ fontWeight: 'semibold', fontSize: 16, paddingBottom: 4 }}>
                  {item.title}
                </Text>
                <Text style={{ color: 'black', fontSize: 15 }}>{item.description}</Text>
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
