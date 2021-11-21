import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './bottom';
import type { AppParamList } from '@app/types/navigation';
import { Home } from '@app/screens';
import { defaultScreenOptions } from './contants';

const Root = createNativeStackNavigator<AppParamList>();

const RootNavigator = () => {
  return (
    <Root.Navigator
      initialRouteName="Tabs"
      screenOptions={defaultScreenOptions}
    >
      <Root.Screen name="Home" component={Home} />
      <Root.Screen name="Tabs" component={BottomNavigator} />
    </Root.Navigator>
  );
};

export default RootNavigator;
