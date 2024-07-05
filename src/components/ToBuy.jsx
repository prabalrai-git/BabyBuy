import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
// import ToBuyModal from './ToBuyModal';
import firestore from '@react-native-firebase/firestore';
import {Switch} from 'react-native-switch';

const ToBuy = ({
  item,
  setFetchAgain,
  setToEditDoc,
  setIsModalVisible,
  setIsDModalVisible,
}) => {
  const [isPurchased, setIsPurchased] = useState();

  useEffect(() => {
    setIsPurchased(item?.isPurchased);
  }, []);
  const onDelete = async () => {
    try {
      await firestore().collection('ToBuys').doc(item.id).delete();
      setFetchAgain(prev => !prev);
    } catch (error) {
      console.log('deleted', error);
    }
  };
  const onEdit = () => {
    setToEditDoc(item);
    setIsModalVisible(item);
  };

  const puschasedToggled = async val => {
    await firestore().collection('ToBuys').doc(item?.id).update({
      name: item?.name,
      image: item?.image,
      location: item?.location,
      isPurchased: val,
    });
    setIsPurchased(val);
  };

  return (
    <>
      <View
        style={{
          backgroundColor: 'lightblue',
          width: '100%',
          borderRadius: 10,
          marginVertical: 15,
          padding: 20,
          elevation: 3,
          flexDirection: 'col',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontWeight: '500', color: 'black', fontSize: 18}}>
            {item?.name}
          </Text>
          <Image
            style={{
              objectFit: 'cover',
              height: 200,
              width: '100%',
              borderRadius: 5,
              marginTop: 8,
            }}
            // source={require('../assets/creams.jpg')}
            source={{
              uri: item?.image,
            }}
          />
        </View>
        <View
          style={{
            gap: 20,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginVertical: 10,
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={() => onEdit()}
            style={{backgroundColor: 'blue', elevation: 5, borderRadius: 5}}>
            <Text style={{color: 'white', padding: 8, paddingHorizontal: 25}}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete()}
            style={{backgroundColor: 'red', elevation: 5, borderRadius: 5}}>
            <Text style={{color: 'white', padding: 8, paddingHorizontal: 25}}>
              Delete
            </Text>
          </TouchableOpacity>

          {/* <View
            style={{
              backgroundColor: 'lightgreen',
              borderColor: 'green',
              borderWidth: 2,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'green',
                alignSelf: 'center',
                paddingHorizontal: 4,
              }}>
              Purchased
            </Text>
          </View> */}
        </View>
        <View style={{flexDirection: 'row', gap: 30, marginVertical: 15}}>
          <Text
            style={{
              color: 'black',
              alignSelf: 'flex-end',
              fontSize: 18,
              fontWeight: '500',
            }}>
            Purchased
          </Text>
          <Switch
            value={isPurchased}
            onValueChange={val => puschasedToggled(val)}
            disabled={false}
            activeText={'Yes'}
            inActiveText={'No'}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setIsDModalVisible(true)}
            style={{
              backgroundColor: 'purple',
              width: '100%',
              paddingVertical: 10,
              marginTop: 10,
              borderRadius: 6,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Delegate Product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ToBuy;
