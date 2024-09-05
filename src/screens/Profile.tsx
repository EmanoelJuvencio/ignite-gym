import { ScrollView, TouchableOpacity } from 'react-native'
import { Center, Heading, Text, VStack } from '@gluestack-ui/themed'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt='$6' px='$10'>
          <UserPhoto
            source={{ uri: 'https://github.com/emanoeljuvencio.png' }}
            alt='Foto do Usuário'
            size='xl'
          />

          <TouchableOpacity>
            <Text
              color='$green500'
              fontFamily='$heading'
              fontSize='$md'
              mt='$2'
              mb='$8'
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w='$full' gap='$4'>
            <Input placeholder='Nome' bg='$gray600' />
            <Input value='emanoeljuvencio@gmail.com' bg='$gray600' isReadOnly />
          </Center>

          <Heading
            alignSelf='flex-start'
            fontFamily='$heading'
            color='$gray200'
            fontSize='$md'
            mt='$12'
            mb='$2'
          >
            Alterar senha
          </Heading>

          <Center w='$full' gap='$4'>
            <Input
              placeholder='Senha antiga'
              textContentType='newPassword'
              secureTextEntry
              bg='$gray600'
            />
            <Input
              placeholder='Nova senha'
              textContentType='newPassword'
              secureTextEntry
              bg='$gray600'
            />
            <Input
              placeholder='Confirme nova senha'
              textContentType='newPassword'
              secureTextEntry
              bg='$gray600'
            />

            <Button title='Atualizar' />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}
