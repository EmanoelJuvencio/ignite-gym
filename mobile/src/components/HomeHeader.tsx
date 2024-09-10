import { Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed'

import { LogOut } from 'lucide-react-native'
import { UserPhoto } from './UserPhoto'

export function HomeHeader() {
  return (
    <HStack
      pt={'$16'}
      pb={'$5'}
      px={'$8'}
      bg='$gray600'
      alignItems='center'
      gap='$4'
    >
      <UserPhoto source={{ uri: 'https://github.com/emanoeljuvencio.png' }} />
      <VStack flex={1}>
        <Text color='$gray100' fontSize={'$sm'}>
          Olá,
        </Text>
        <Heading color='$gray100' fontSize={'$md'}>
          Emanoel
        </Heading>
      </VStack>
      <Icon as={LogOut} color='$gray200' size='xl' />
    </HStack>
  )
}
