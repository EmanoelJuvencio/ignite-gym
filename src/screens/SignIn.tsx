import {
  Center,
  Image,
  VStack,
  Text,
  Heading,
  ScrollView,
} from '@gluestack-ui/themed'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg='$gray700'>
        <Image
          alt='Pessoas treinando'
          w={'$full'}
          h={624}
          position='absolute'
          source={BackgroundImg}
          defaultSource={BackgroundImg}
        />

        <VStack flex={1} px={'$10'} pb={'$16'}>
          <Center my={'$24'}>
            <Logo />
            <Text color='$gray100' fontSize='$sm'>
              Treine Sua Mente e seu corpo
            </Text>
          </Center>

          <Center gap={'$4'}>
            <Heading color='$gray100'>Acesse a conta</Heading>
            <Input
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <Input placeholder='Senha' type='password' />

            <Button title='Acessar' />
          </Center>

          <Center flex={1} justifyContent='flex-end' gap={'$3'}>
            <Text color='$gray100' fontFamily='$body' fontSize={'$sm'}>
              Ainda não tem acesso?
            </Text>
            <Button title='Criar conta' variant='outline' />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
