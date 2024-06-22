import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUserData} from '../screens/Register';

const HeaderBar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData();
      setUserData(user);
    };

    fetchUserData();
  }, []);

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
      <Image
        source={{
          uri: 'https://lh3.googleusercontent.com/a/ACg8ocLvjnF6ZHvO-QFGhSYz2q-q6-G5MhYcJewNFg00DuZ2NlF_GGbe=s96-c',
        }}
        style={{width: 35, height: 35, borderRadius: 20}}
      />
    </View>
  );
};

export default HeaderBar;
