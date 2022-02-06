import React, {useEffect} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import PushNotification from 'react-native-push-notification';
export default function Splash({navigation}) {
  useEffect(() => {
    createChannels();
    setTimeout(() => {
      navigation.replace('My Tasks');
    }, 2000);
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        // channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        // playSound: false, // (optional) default: true
        // soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        // vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      // created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/checklist.png')}
      />
      <Text style={styles.text}> Abrar To-Do List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#516BEB',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});
