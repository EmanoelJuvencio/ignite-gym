import { StatusBar, Text, View } from 'react-native'

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })

  if (!fontsLoaded) {
    return null
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#202024',
      }}
    >
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 30 }}>Home</Text>
    </View>
  )
}
