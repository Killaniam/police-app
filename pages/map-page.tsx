import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { requestLocationPermission } from '@/utils/locationUtils';
import { fetchNearbyStations } from '@/app/api/locationAPI';

// Interface defining the structure of a station with location coordinates, name and optional phone number
interface Station {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  phone?: string;
}

const MapPage: React.FC = () => {
  // State to store user's current location
  const [ownLocation, setOwnLocation] = useState<Location.LocationObject | null>(null);
  // State to store array of nearby stations
  const [nearbyStations, setNearbyStations] = useState<Station[]>([]);
  // State to force map re-render when location updates
  const [randomMapKey, setRandomMapKey] = useState(1);

  useEffect(() => {
    // Function to get user location and fetch nearby stations
    const initializeLocation = async () => {
      // Request and get user's location permission and coordinates
      const location = await requestLocationPermission();
      if (location) {
        // Set user's location in state
        setOwnLocation(location);
        const { latitude, longitude } = location.coords;

        try {
          // Fetch nearby stations based on user's coordinates
          const nearbyStationData = await fetchNearbyStations(latitude, longitude);

          // Update nearby stations state with fetched data
          setNearbyStations(nearbyStationData?.results);
          // Increment key to trigger map refresh
          setRandomMapKey(randomMapKey + 1);
        } catch (error) {
          // Log error if fetching stations fails
          console.error('Error fetching nearby stations:', error);
        }
      }
    };

    // Call initialization function when component mounts
    initializeLocation();
  }, []);
  // Log nearby stations for debugging
  console.log(nearbyStations);
  return (
    // Container view for the map with full height
    <View className="h-full">
      {/* MapView component with full width and height */}
      <MapView
        key={randomMapKey}
        style={{ width: '100%', height: '100%' }}
        // Set initial map region with user location or default coordinates
        region={{
          latitude: ownLocation?.coords.latitude || 37.78825,
          longitude: ownLocation?.coords.longitude || -122.4324,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation
      >
        {/* Marker for user's current location */}
        <Marker
          coordinate={{
            latitude: ownLocation?.coords.latitude || 37.78825,
            longitude: ownLocation?.coords.longitude || -122.4324,
          }}
          title="Current Location"
          description="Your Location"
        />
        {/* Map through nearby stations and create markers for each */}
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
