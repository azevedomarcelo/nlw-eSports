import { NavigationContainer } from '@react-navigation/native';

import { Routes as AppRoutes } from './app.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}