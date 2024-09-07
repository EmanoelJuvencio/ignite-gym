import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { TAuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

export function SignUp() {
  const navigation = useNavigation<TAuthNavigatorRoutesProps>()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  function handleSignUp() {
    console.log({ name, email, password, passwordConfirm })
  }

  function handleBackSignIn() {
    navigation.navigate('signIn')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
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

          <Center flex={1} justifyContent='flex-start' gap={'$4'}>
            <Heading color='$gray100'>Crie sua conta</Heading>
            <Input placeholder='Nome' onChangeText={setName} />
            <Input
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={setEmail}
            />
            <Input
              placeholder='Senha'
              secureTextEntry
              textContentType='newPassword'
              onChangeText={setPassword}
            />
            <Input
              placeholder='Confirme sua senha'
              secureTextEntry
              textContentType='newPassword'
              onChangeText={setPasswordConfirm}
            />

            <Button title='Criar e acessar' onPress={handleSignUp} />
          </Center>

          <Button
            title='Voltar para o Login'
            variant='outline'
            onPress={handleBackSignIn}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
