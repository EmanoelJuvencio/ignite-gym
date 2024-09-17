import { Box } from '@gluestack-ui/themed'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import { useAuth } from '@hooks/useAuth'

import { AuthRoutes } from './auth.routes'
// import { AppRoutes } from './app.routes'

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  const { user } = useAuth()

  console.log('User vindo do hook useAuth ==>', user)

  return (
    <Box flex={1} bg='$gray700'>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </Box>
  )
}
