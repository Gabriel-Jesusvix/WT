import { Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
export default function App() {
const [fontsLoaded] = useFonts({
  Roboto_400Regular, Roboto_700Bold
})

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#202024'
    }}> 
    <StatusBar 
      barStyle="light-content"
      translucent
      backgroundColor="transparent"
    />
      {
        fontsLoaded ?  <Text>Hello WT</Text> : <View />
      }
    </View>
  );
}

