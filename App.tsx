import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';

import { Loading } from '@components/Loading';

import { AuthContextProvider } from '@contexts/AuthContext';
import { Routes } from '@routes/index';
import React from 'react';
import { THEME } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_700Bold,
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <AuthContextProvider>
        {
          fontsLoaded ? <Routes /> : <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
