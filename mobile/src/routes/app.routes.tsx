import { Platform } from 'react-native'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import { Excercise } from '@screens/Exercise'
import { History } from '@screens/History'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'

import HomeSVG from '@assets/home.svg'
import HistorySVG from '@assets/history.svg'
import ProfileSVG from '@assets/profile.svg'

type TAppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: undefined
}

export type TAppNavigatorRoutesProps = BottomTabNavigationProp<TAppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<TAppRoutes>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.green500,
        tabBarInactiveTintColor: tokens.colors.gray200,
        tabBarStyle: {
          backgroundColor: tokens.colors.gray600,
          borderTopWidth: 2,
          borderTopColor: tokens.colors.gray500,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingTop: tokens.space[6],
        },
      }}
    >
      <Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSVG fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name='history'
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySVG fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSVG fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name='exercise'
        component={Excercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )

  return
}
