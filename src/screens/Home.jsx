import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import ToBuy from '../components/ToBuy';
import ToBuyModal from '../components/ToBuyModal';
import firestore from '@react-native-firebase/firestore';
import DelegateModal from '../components/DelegateModal';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toBuys, setToBuys] = useState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [toEditDoc, setToEditDoc] = useState();
  const [isDModalVisible, setIsDModalVisible] = useState(false);

  async function getCollectionData() {
    try {
      const db = firestore();
      const collectionRef = db.collection('ToBuys');

      const querySnapshot = await collectionRef.get();

      const dataWithIds = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), // Spread operator to include all document data
      }));

      setToBuys(dataWithIds);

      // Use dataWithIds in your component state or for further processing
    } catch (error) {
      console.error('Error getting collection data:', error);
    }
  }

  useEffect(() => {
    getCollectionData();
  }, [fetchAgain]);

  return (
    <>
      <ToBuyModal
        isModalVisible={isModalVisible}
        toEditDoc={toEditDoc}
        setIsModalVisible={setIsModalVisible}
        setFetchAgain={setFetchAgain}
        setToEditDoc={setToEditDoc}
      />
      <DelegateModal
        setIsModalVisible={setIsDModalVisible}
        isModalVisible={isDModalVisible}
      />
      <View style={{flex: 1, padding: 30}}>
        <Text style={{color: 'black', fontSize: 20}}>
          Greetings Prabal Rai!
        </Text>

        <Text style={{marginTop: 20, color: 'gray'}}>
          Add a new product to buy for your baby:
        </Text>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={{
            backgroundColor: 'lightgreen',
            width: '100%',
            borderRadius: 10,
            padding: 10,
            marginVertical: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 500,
              fontSize: 20,
              textAlign: 'center',
            }}>
            Add
          </Text>
        </TouchableOpacity>
        <ScrollView style={{marginBottom: 10}}>
          {toBuys?.map(item => {
            return (
              <ToBuy
                key={item.image}
                setIsDModalVisible={setIsDModalVisible}
                item={item}
                setFetchAgain={setFetchAgain}
                setToEditDoc={setToEditDoc}
                setIsModalVisible={setIsModalVisible}
              />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
