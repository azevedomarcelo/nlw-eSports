import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
import { 
  useFonts, 
  Inter_700Bold, 
  Inter_900Black, 
  Inter_400Regular, 
  Inter_600SemiBold 
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold, 
    Inter_900Black, 
    Inter_400Regular, 
    Inter_600SemiBold 
  });
  
  const getPushNotificationListener = useRef<Subscription>()
  const responsePushNotificationListener = useRef<Subscription>()
  
  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getPushNotificationListener.current = Notifications.addNotificationReceivedListener(notification => console.log(notification));
    responsePushNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => console.log(response));

    return () => {
      if (getPushNotificationListener.current && responsePushNotificationListener.current) {
        Notifications.removeNotificationSubscription(getPushNotificationListener.current);
        Notifications.removeNotificationSubscription(responsePushNotificationListener.current);
      }
    }
  }, []);
  
  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}

    </Background>
  );
}