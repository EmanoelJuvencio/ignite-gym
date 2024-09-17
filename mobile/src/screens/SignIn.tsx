import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Image,
  VStack,
  Text,
  Heading,
  ScrollView,
  useToast,
} from '@gluestack-ui/themed'

import { TAuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { ToastMessage } from '@components/ToastMessage'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

type TFormDataProps = {
  email: string
  password: string
}

export function SignIn() {
  const navigation = useNavigation<TAuthNavigatorRoutesProps>()

  const { signIn } = useAuth()

  const signInSchema = yup.object({
    email: yup.string().required('Informe o E-mail.').email('E-mail Invalido.'),
    password: yup.string().required('Informe a Senha.'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormDataProps>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signInSchema),
  })

  async function handleSignIn({ email, password }: TFormDataProps) {
    await signIn(email, password)
  }

  function handleNewAccount() {
    navigation.navigate('signUp')
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

          <Center gap={'$4'}>
            <Heading color='$gray100'>Acesse a conta</Heading>

            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='E-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Senha'
                  secureTextEntry
                  textContentType='password'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button title='Acessar' onPress={handleSubmit(handleSignIn)} />
          </Center>

          <Center flex={1} justifyContent='flex-end' gap={'$3'}>
            <Text color='$gray100' fontFamily='$body' fontSize={'$sm'}>
              Ainda não tem acesso?
            </Text>
            <Button
              title='Criar conta'
              variant='outline'
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
