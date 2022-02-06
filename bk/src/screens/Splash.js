import React, {useEffect} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('My Tasks');
    }, 2000);
  }, []);

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
