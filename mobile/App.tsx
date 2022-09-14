import { 
  useFonts, 
  Inter_700Bold, 
  Inter_900Black, 
  Inter_400Regular, 
  Inter_600SemiBold 
} from '@expo-google-fonts/inter';
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';


export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold, 
    Inter_900Black, 
    Inter_400Regular, 
    Inter_600SemiBold 
  });
  if (!fontsLoaded) return
  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Home /> : <Loading />}

    </Background>
  );
}