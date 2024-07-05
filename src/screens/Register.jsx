import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId:
    '961537612997-4pja42qr4jeed93uovqk5jhfs987sclg.apps.googleusercontent.com',
});

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userInfo');

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    console.log('signed out successfully!');
  } catch (error) {
    console.error(error);
  }
};
const Register = ({navigation}) => {
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {user} = userInfo;
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('userInfo', jsonValue);
      navigation.navigate('Home');
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            console.log(error);
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            console.log(error);

            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            console.log(error);

            break;
          default:
            // some other error happened
            console.log(error);
        }
      } else {
        // an error that's not related to google sign in occurred
        console.log(error);
      }
    }
  };

  return (
    <View
      style={{
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Text style={{fontSize: 32, color: 'black', marginBottom: 40}}>
        Sign Up
      </Text>
      <Text style={{color: 'black', fontSize: 16}}>
        Please use your google account to register:
      </Text>
      <Button title="Google Sign-In" onPress={() => _signIn()} />
      {/* <Button title="Google Sign-Out" onPress={() => signOut()} /> */}
    </View>
  );
};

export default Register;
