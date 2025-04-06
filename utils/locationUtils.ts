import * as Location from 'expo-location';

// requestLocationPermission function requests location permission from the user
export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }
    const location = await Location.getCurrentPositionAsync({});
    return location;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    throw error;
  }
};
