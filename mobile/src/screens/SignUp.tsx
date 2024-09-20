import { useState } from 'react'
import { Alert } from 'react-native'
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'

import { TAuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ToastMessage } from '@components/ToastMessage'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { useAuth } from '@hooks/useAuth'

type TFormDataProps = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe seu nome.'),
  email: yup.string().required('Informe o E-mail.').email('E-mail Invalido.'),
  password: yup
    .string()
    .required('Informe a Senha.')
    .min(6, 'A senha deve ter no minimo 6 digitos.'),
  passwordConfirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere.'),
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<TAuthNavigatorRoutesProps>()
  const toast = useToast()
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormDataProps>({
    defaultValues: { name: '', email: '', password: '', passwordConfirm: '' },
    resolver: yupResolver(signUpSchema),
  })

  async function handleSignUp({ name, email, password }: TFormDataProps) {
    try {
      setIsLoading(true)
      await api.post('/users', { name, email, password })
      await signIn(email, password)
    } catch (error) {
      const errorMessage =
        error instanceof AppError
          ? error.message
          : 'Não foi possível criar conta, tente novamente mais tarde.'
      return toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action='error'
            title='Erro ao cadastrar conta'
            description={errorMessage}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoading(false)
    }
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

            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Nome'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

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
                  textContentType='newPassword'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='passwordConfirm'
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Confirme sua senha'
                  secureTextEntry
                  textContentType='newPassword'
                  onChangeText={onChange}
                  value={value as string}
                  errorMessage={errors.passwordConfirm?.message}
                />
              )}
            />

            <Button
              title='Criar e acessar'
              isLoading={isLoading}
              onPress={handleSubmit(handleSignUp)}
            />
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
