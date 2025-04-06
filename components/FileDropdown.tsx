import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

interface DropdownProps {
  label: string;
  setImageBase64?: React.Dispatch<React.SetStateAction<string | null>>;
  selectedFile?: string;
  setSelectedFile?: React.Dispatch<React.SetStateAction<string>>;
  uploadedFile?: string | null;
  setUploadedFile?: React.Dispatch<React.SetStateAction<string | null>>;
  tooltip?: string;
}

const FileDropdown: React.FC<DropdownProps> = ({
  label,
  setImageBase64,
  selectedFile,
  setSelectedFile,
  uploadedFile,
  setUploadedFile,
  tooltip,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Function to handle image picking and convert to Base64
  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });

      if (result.canceled === false) {
        const fileUri = result.assets[0].uri;
        const mimeType = result.assets[0].mimeType;

        if (Platform.OS === 'web') {
          if (setImageBase64 && fileUri) {
            setImageBase64(fileUri);
          }
        } else {
          // Convert image to Base64
          const base64String = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Convert Base64 to Data URI with correct format
          const base64Uri = `data:${mimeType};base64,${base64String}`;

          if (setImageBase64 && base64Uri) {
            setImageBase64(base64Uri);
          }
        }
        if (setSelectedFile) {
          setSelectedFile(result.assets[0].name);
        }
        if (setUploadedFile) {
          setUploadedFile(fileUri);
        }
      }
    } catch (err) {
      console.error('Image picking error:', err);
    }
  };

  return (
    <View style={{ paddingHorizontal: 4, paddingTop: 4, paddingBottom: 28 }}>
      <View className="flex-row items-center relative">
        <Text className="text-base text-[#151569] font-medium pb-[6px]">{label}</Text>
        {tooltip && (
          <View className="relative">
            <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)} className="ml-2">
              <Ionicons name="information-circle-outline" size={18} color="#151569" />
            </TouchableOpacity>
            {showTooltip && (
              <View
                className="absolute top-6 left-0 bg-gray-800 p-2 rounded-md"
                style={{ width: 200, zIndex: 999, elevation: 5 }}
              >
                <Text className="text-white text-sm">{tooltip}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={pickImage}
        style={{ padding: Platform.OS === 'android' ? 6 : 16 }}
        className={`flex-row items-center bg-white p-4 rounded-lg `}
      >
        <TextInput
          value={selectedFile || 'Upload Image'}
          className={`flex-1 text-gray-800 text-base font-medium focus:outline-none`}
          editable={false}
        />
        <Ionicons name="image" size={20} />
      </TouchableOpacity>

      {/* Display Uploaded Image */}
      {uploadedFile && (
        <>
          <View className={`mt-8 rounded-md mx-auto border border-gray-400 w-full`}>
            <Image
              source={{ uri: uploadedFile }}
              style={{ width: '100%', height: 150, borderRadius: 5, resizeMode: 'cover' }}
            />
          </View>
          <Text className={`text-gray-800 font-medium text-center pt-2`}>
            Selected File: {selectedFile}
          </Text>
        </>
      )}
    </View>
  );
};

export default FileDropdown;
