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
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import RNPickerSelect from 'react-native-picker-select';
import {SendDirectSms} from 'react-native-send-direct-sms';

const DelegateModal = ({setIsModalVisible, isModalVisible}) => {
  const [contacts, setContacts] = useState();
  const [choosenContact, setChoosenContact] = useState();

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        console.log('Permission: ', res);
        Contacts.getAll()
          .then(contacts => {
            // work with contacts
            // console.log(contacts);

            const finalContacts = contacts.map(item => {
              return {
                label: item.givenName ? item.givenName : 'n/a',

                value: item.phoneNumbers[0]?.number,
              };
            });
            setContacts(finalContacts);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  }, []);

  const closeModal = () => {
    setIsModalVisible(false);
  };
  function sendSmsData(choosenContact, bodySMS) {
    SendDirectSms(choosenContact, bodySMS)
      .then(res => console.log('SMS sent successfully', res))
      .catch(err => console.error('Error sending SMS', err));
  }
  return (
    <Modal
      isVisible={isModalVisible}
      animationOutTiming={500}
      backdropTransitionOutTiming={500}>
      <View
        style={{
          backgroundColor: 'white',
          minHeight: '35%',
          borderRadius: 6,
          color: 'black',
        }}>
        {/* <RNPickerSelect
          placeholder={'Choose your contact'}
          value={choosenContact}
          onValueChange={value => setChoosenContact(value)}
          items={contacts}
        /> */}
        <Text style={{color: 'black', padding: 20, paddingLeft: 30}}>
          Enter mobile number to send delegation to:
        </Text>
        <TextInput
          onChangeText={e => setChoosenContact(e)}
          value={choosenContact}
          style={{
            borderColor: 'black',
            borderWidth: 2,
            width: '90%',
            margin: 'auto',
            marginBottom: 10,
            color: 'black',
          }}></TextInput>
        <View>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}
            style={{
              backgroundColor: 'blue',
              width: '90%',
              paddingVertical: 10,
              margin: 'auto',
              marginTop: 0,
              borderRadius: 6,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
              sendSmsData(choosenContact, 'Please get this product for me');
            }}
            style={{
              backgroundColor: 'purple',
              width: '90%',
              paddingVertical: 10,
              margin: 'auto',
              marginTop: 10,
              borderRadius: 6,
              marginBottom: 20,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>Send SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DelegateModal;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: 'black',
  },
});
