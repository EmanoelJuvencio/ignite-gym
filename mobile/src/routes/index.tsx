import { Box, Text, View } from '@gluestack-ui/themed'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import { useAuth } from '@hooks/useAuth'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { Loading } from '@components/Loading'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  const { user, isLoadingUserStorageData } = useAuth()
  console.log(isLoadingUserStorageData)

  if (isLoadingUserStorageData) {
    console.log('hiihhi')

    return <Loading />
  }
  return (
    <Box flex={1} bg='$gray700'>
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
