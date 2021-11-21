import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from '@app/navigation';
// @ts-ignore
import { ThemeProvider } from 'styled-components/native';
import { useColorSchemeTheme } from '@app/theme';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'urql';
import { client } from '@app/urql/client';

const App = () => {
  const { theme, navigatorTheme } = useColorSchemeTheme();

  return (
    <Provider value={client}>
      <NavigationContainer theme={navigatorTheme}>
        <ThemeProvider theme={theme}>
          <StatusBar />
          <Navigator />
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
