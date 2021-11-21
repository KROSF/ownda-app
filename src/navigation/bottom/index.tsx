import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomParamList } from '@app/types/navigation';
import { Transactions, Analytics, Assets, Settings } from '@app/screens';
import { defaultScreenOptions } from './constants';
import { Icon } from '@app/components/atoms';

export const Bottom = createBottomTabNavigator<BottomParamList>();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator screenOptions={defaultScreenOptions}>
      <Bottom.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'cardFilled' : 'card'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Analytics"
        component={Analytics}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'analyticsFilled' : 'analytics'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Assets"
        component={Assets}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'assetsFilled' : 'assets'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'settingsFilled' : 'settings'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
