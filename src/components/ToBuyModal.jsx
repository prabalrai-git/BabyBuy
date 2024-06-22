import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import UploadImage from './UploadImage';
import firestore from '@react-native-firebase/firestore';

const ToBuyModal = ({
  isModalVisible,
  setIsModalVisible,
  setFetchAgain,
  toEditDoc,
  setToEditDoc,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (toEditDoc) {
      setName(toEditDoc?.name);
      setSelectedImage(toEditDoc?.image);
    }
  }, [toEditDoc]);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onAdd = async () => {
    try {
      setIsLoading(true);

      await firestore().collection('ToBuys').add({
        name: name,
        image: image,
      });
      setName();
      setImage();
      setSelectedImage();
      setIsModalVisible(false);
      setFetchAgain(prev => !prev);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  // console.log(toEditDoc, 'toEditDoc');
  const onEdit = async () => {
    try {
      await firestore()
        .collection('ToBuys')
        .doc(toEditDoc?.id)
        .update({
          name: name,
          image: image ? image : toEditDoc?.image,
        });
      setName();
      setImage();
      setSelectedImage();
      setIsModalVisible(false);
      setFetchAgain(prev => !prev);
      setIsLoading(false);
      setToEditDoc();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      animationOutTiming={500}
      backdropTransitionOutTiming={500}>
      <View
        style={{
          backgroundColor: 'white',
          minHeight: '70%',
          borderRadius: 6,
          color: 'black',
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            padding: 20,
            borderBottomEndRadius: 6,
            borderBottomLeftRadius: 6,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => closeModal()}
            style={{
              backgroundColor: 'white',
              elevation: 2,
              borderRadius: 5,
              borderColor: 'black',
              borderWidth: 0.5,
            }}>
            <Text style={{color: 'black', padding: 8, paddingHorizontal: 25}}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            onPress={toEditDoc ? onEdit : onAdd}
            style={{
              backgroundColor: 'green',
              elevation: 2,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', padding: 8, paddingHorizontal: 45}}>
              {toEditDoc ? 'Edit' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: 15, marginTop: 20}}>
          <Text style={{color: 'black', paddingLeft: 12}}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={e => setName(e)}
            value={name}
            placeholder="Enter a name"
            placeholderTextColor={'gray'}
          />
          <UploadImage
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            setImage={setImage}
          />
          {selectedImage && (
            <Image
              source={{uri: selectedImage}}
              style={{width: '100%', height: 200, marginBottom: 30}}
              resizeMode="cover"
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ToBuyModal;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: 'black',
  },
});
