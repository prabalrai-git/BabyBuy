import {View, Text, Button, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  launchImageLibrary as _launchImageLibrary,
  launchCamera as _launchCamera,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

let launchImageLibrary = _launchImageLibrary;
let launchCamera = _launchCamera;

const UploadImage = ({setSelectedImage, selectedImage, setImage}) => {
  const [imageInfo, setImageInfo] = useState();

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setImageInfo(response.assets?.[0]?.fileName);
      setSelectedImage(imageUri);
    }
  };

  const uploadImageToFireBaseBucket = async () => {
    const reference = storage().ref(imageInfo);

    // uploads file
    try {
      await reference.putFile(selectedImage);
      const url = await storage().ref(imageInfo).getDownloadURL();
      setImage(url);
    } catch (error) {
      console.log(error, 'now this');
    }
  };

  useEffect(() => {
    if (selectedImage && imageInfo) {
      uploadImageToFireBaseBucket();
    }
  }, [selectedImage, imageInfo]);

  return (
    <>
      <View style={{marginTop: 20}}>
        <Button title="Choose from Device" onPress={openImagePicker} />
      </View>
      <View style={{marginTop: 20, marginBottom: 50}}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View>
    </>
  );
};

export default UploadImage;
