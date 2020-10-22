import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Stripes from '../Screen/Stripes/Stripe_index';
import Videos from '../Screen/Videos/Videos_index';


const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Videos">
        <Tab.Screen name="Videos" component={Videos}
          options={{
            tabBarLabel: 'Videos',
            tabBarIcon: ({ color }) => (
              <Icon name="play-circle" size={24} color={color} />
            )
          }} />
        <Tab.Screen name="Stripes" component={Stripes}
          options={{
            tabBarLabel: 'Stripes',
            tabBarIcon: ({ color }) => (
              <Icon name="tint" size={24} color={color} />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;