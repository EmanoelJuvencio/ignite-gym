import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { TAuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

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
  const navigation = useNavigation<TAuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormDataProps>({
    defaultValues: { name: '', email: '', password: '', passwordConfirm: '' },
    resolver: yupResolver(signUpSchema),
  })

  function handleSignUp({ name, email, password }: TFormDataProps) {
    fetch('http://172.16.81.90:3333/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
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
