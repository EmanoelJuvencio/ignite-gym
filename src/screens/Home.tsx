import { Center, SafeAreaView, Text, VStack } from '@gluestack-ui/themed'

import { HomeHeader } from '@components/HomeHeader'

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />
      <Center flex={1}>
        <Text color='$white'>Home</Text>
      </Center>
    </VStack>
  )
}
