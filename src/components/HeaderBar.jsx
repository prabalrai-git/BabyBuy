import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUserData, signOut} from '../screens/Register';
import {useNavigation} from '@react-navigation/native';

const HeaderBar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData();
      setUserData(user);
    };

    fetchUserData();
  }, []);
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '95%',
      }}>
      <Text
        style={{
          textTransform: 'capitalize',
          color: 'black',
          alignSelf: 'center',
        }}>
        {userData && userData.name}
      </Text>
      <View style={{flexDirection: 'row', gap: 20}}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/a/ACg8ocLvjnF6ZHvO-QFGhSYz2q-q6-G5MhYcJewNFg00DuZ2NlF_GGbe=s96-c',
          }}
          style={{width: 35, height: 35, borderRadius: 20}}
        />
        <Text
          onPress={() => {
            signOut();
            navigation.navigate('Register');
          }}
          style={{
            color: 'white',
            alignSelf: 'center',
            backgroundColor: 'gray',
            fontWeight: '600',
            padding: 7,
            paddingHorizontal: 15,
            elevation: 5,
            borderRadius: 6,
          }}>
          Logout
        </Text>
      </View>
    </View>
  );
};

export default HeaderBar;
