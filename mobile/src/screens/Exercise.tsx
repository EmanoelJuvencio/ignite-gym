import { ScrollView, TouchableOpacity } from 'react-native'
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'

import { Button } from '@components/Button'

import BodySVG from '@assets/body.svg'
import SeriesSVG from '@assets/series.svg'
import RepetitionSVG from '@assets/repetitions.svg'

import { TAppNavigatorRoutesProps } from '@routes/app.routes'

export function Excercise() {
  const navigation = useNavigation<TAppNavigatorRoutesProps>()
  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <VStack flex={1}>
      <VStack px='$8' pt='$12' bg='$gray600'>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color='$green500' size='xl' />
        </TouchableOpacity>
        <HStack
          justifyContent='space-between'
          alignItems='center'
          mt='$4'
          mb='$8'
        >
          <Heading
            color='$gray100'
            fontFamily='$heading'
            fontSize='$lg'
            flexShrink={1}
          >
            Puxada Frontal
          </Heading>
          <HStack alignItems='center' gap={2}>
            <BodySVG />
            <Text color='$gray200' textTransform='capitalize'>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack p='$8'>
          <Image
            source={{
              uri: 'https://istil.com.br/_upload/2024/04/26/treino-de-costas-confira-os-melhores-exercicios-para-fazer-na-academia-662c10cfdc18c.jpg',
            }}
            alt='Exercício'
            mb='$3'
            resizeMode='cover'
            rounded='$lg'
            w='$full'
            h='$80'
          />

          <Box bg='$gray600' rounded='$md' pb='$4' px='$4'>
            <HStack justifyContent='space-between' p='$6'>
              <HStack gap='$2' alignItems='center'>
                <SeriesSVG />
                <Text color='$gray200'>3 Séries</Text>
              </HStack>

              <HStack gap='$2' alignItems='center'>
                <RepetitionSVG />
                <Text color='$gray200'>12 Repetições</Text>
              </HStack>
            </HStack>
            <Button title='Marcar como realizado' />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
