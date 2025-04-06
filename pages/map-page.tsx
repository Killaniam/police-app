import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { requestLocationPermission } from '@/utils/locationUtils';
import { fetchNearbyStations } from '@/app/api/locationAPI';

// Define the Station interface
interface Station {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  phone?: string; // Added phone field
}

const MapPage: React.FC = () => {
  const [ownLocation, setOwnLocation] = useState<Location.LocationObject | null>(null);
  const [nearbyStations, setNearbyStations] = useState<Station[]>([]);
  const [randomMapKey, setRandomMapKey] = useState(1);

  // Fetch nearby stations and initialize user location
  useEffect(() => {
    const initializeLocation = async () => {
      const location = await requestLocationPermission();
      if (location) {
        setOwnLocation(location);
        const { latitude, longitude } = location.coords;

        try {
          const nearbyStationData = await fetchNearbyStations(latitude, longitude);

          setNearbyStations(nearbyStationData?.results);
          setRandomMapKey(randomMapKey + 1);
        } catch (error) {
          console.error('Error fetching nearby stations:', error);
        }
      }
    };

    initializeLocation();
  }, []);
  console.log(nearbyStations);
  return (
    <View className="h-full">
      <MapView
        key={randomMapKey}
        style={{ width: '100%', height: '100%' }}
        region={{
          latitude: ownLocation?.coords.latitude || 37.78825,
          longitude: ownLocation?.coords.longitude || -122.4324,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation
      >
        <Marker
          coordinate={{
            latitude: ownLocation?.coords.latitude || 37.78825,
            longitude: ownLocation?.coords.longitude || -122.4324,
          }}
          title="Current Location"
          description="Your Location"
        />
        {nearbyStations?.map((station, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: station.geometry.location.lat,
              longitude: station.geometry.location.lng,
            }}
            title={station.name}
            description={station.phone || 'Contact: 100'}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapPage;
