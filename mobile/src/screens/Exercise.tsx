import { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'

import { ToastMessage } from '@components/ToastMessage'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import BodySVG from '@assets/body.svg'
import SeriesSVG from '@assets/series.svg'
import RepetitionSVG from '@assets/repetitions.svg'

import { TExerciseDTO } from '@dtos/ExerciseDTO'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { TAppNavigatorRoutesProps } from '@routes/app.routes'

type TRouteParamsProps = {
  exerciseId: string
}

export function Excercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<TExerciseDTO>({} as TExerciseDTO)
  const navigation = useNavigation<TAppNavigatorRoutesProps>()
  const toast = useToast()
  const route = useRoute()
  const { exerciseId } = route.params as TRouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${exerciseId}`)
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const errorMessage = isAppError
        ? error.message
        : 'Não foi possivel carregar os detalhes do exercício.'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action='error'
            title='Erro ao buscar dados'
            description={errorMessage}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

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
            {exercise.name}
          </Heading>
          <HStack alignItems='center' gap={2}>
            <BodySVG />
            <Text color='$gray200' textTransform='capitalize'>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <VStack p='$8'>
            <Box mb='$3' rounded='$lg' overflow='hidden'>
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt='Exercício'
                resizeMode='cover'
                w='$full'
                h={520}
              />
            </Box>

            <Box bg='$gray600' rounded='$md' pb='$4' px='$4'>
              <HStack justifyContent='space-between' p='$6'>
                <HStack gap='$2' alignItems='center'>
                  <SeriesSVG />
                  <Text color='$gray200'>{exercise.series} Séries</Text>
                </HStack>

                <HStack gap='$2' alignItems='center'>
                  <RepetitionSVG />
                  <Text color='$gray200'>
                    {exercise.repetitions} Repetições
                  </Text>
                </HStack>
              </HStack>
              <Button title='Marcar como realizado' />
            </Box>
          </VStack>
        )}
      </ScrollView>
    </VStack>
  )
}
