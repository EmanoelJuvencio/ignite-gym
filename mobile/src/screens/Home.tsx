import { Heading, HStack, Text, useToast, VStack } from '@gluestack-ui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { ToastMessage } from '@components/ToastMessage'

import { TAppNavigatorRoutesProps } from '@routes/app.routes'

import { Loading } from '@components/Loading'
import { TExerciseDTO } from '@dtos/ExerciseDTO'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'

export function Home() {
  const [exercises, setExercises] = useState<TExerciseDTO[]>([])
  const [groups, setGroups] = useState<string[]>([])
  const [groupSelected, setGroupSelected] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()
  const navigation = useNavigation<TAppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const response = await api.get('/groups')
      setGroups(response.data)
      setGroupSelected(response.data[0])
    } catch (error) {
      toastErrorHandler(
        error,
        'Não foi possível carregar os grupos musculares.'
      )
    }
  }

  async function fetchExcercisesByGroup() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(response.data)
    } catch (error) {
      toastErrorHandler(error, 'Não foi possível carregar os exercícios.')
    } finally {
      setIsLoading(false)
    }
  }

  function toastErrorHandler(
    error: unknown,
    genericMessageError = 'Houve uma falha aos buscar as informações tente novamente mais tarde.'
  ) {
    const isAppError = error instanceof AppError
    const errorMessage = isAppError ? error.message : genericMessageError

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
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExcercisesByGroup()
    }, [groupSelected])
  )

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        keyExtractor={(item) => item}
        data={groups}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 32,
        }}
        style={{
          marginVertical: 40,
          maxHeight: 44,
          minHeight: 44,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack px='$8' flex={1}>
          <HStack mb='$5' justifyContent='space-between' alignItems='center'>
            <Heading color='$gray200' fontSize='$md' fontFamily='$heading'>
              Exercicíos
            </Heading>
            <Text color='$gray200' fontSize='$sm' fontFamily='$body'>
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={exercises}
            renderItem={({ item }) => (
              <ExerciseCard data={item} onPress={handleOpenExerciseDetails} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        </VStack>
      )}
    </VStack>
  )
}
