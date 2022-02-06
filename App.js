import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Todo from './src/screens/Todo';
import Done from './src/screens/Done';
import Splash from './src/screens/Splash';
import Tasks from './src/screens/Tasks';
import Camera from './src/screens/Camera';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'To-Do') {
            iconName = 'clipboard-list';
            size = focused ? 25 : 20;
          } else if (route.name === 'Done') {
            iconName = 'clipboard-check';
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarOptions: {
          activeTintColor: '#0080ff',
          inactiveTintColor: '#777777',
          labelStyle: {fontSize: 15, fontWeight: 'bold'},
        },
      })}>
      <Tab.Screen name={'To-Do'} component={Todo} />
      <Tab.Screen name={'Done'} component={Done} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
          }}>
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="splash"
            component={Splash}
          />
          <RootStack.Screen name="My Tasks" component={HomeTabs} />
          <RootStack.Screen name="Tasks" component={Tasks} />
          <RootStack.Screen name="Camera" component={Camera} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
