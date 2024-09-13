import { StatusBar } from 'react-native'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from './config/gluestack-ui.config'

import { Routes } from '@routes/index'
import { Loading } from '@components/Loading'

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto'
import { AuthContext } from '@contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <AuthContext.Provider
        value={{
          id: '1',
          name: 'Emanoel',
          email: 'emanoeljuvencio@gmail.com',
          avatar: 'emanoel.png',
        }}
      >
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </GluestackUIProvider>
  )
}
