import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Stripes from '../Screen/Stripes';
import Videos from '../Screen/Videos';


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Videos" component={Videos} />
        <Tab.Screen name="Stripes" component={Stripes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigator;