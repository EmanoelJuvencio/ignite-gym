import { useState } from 'react'
import { FlatList } from 'react-native'
import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'
import { ExerciseCard } from '@components/ExerciseCard'

type TExerciseProps = {
  title: string
  description: string
  url: string
}

export function Home() {
  const [exercises, setExercises] = useState<TExerciseProps[]>([
    {
      title: 'Puxada Frontal',
      description: '3 Séries x 12 Repetições',
      url: 'https://istil.com.br/_upload/2024/04/26/treino-de-costas-confira-os-melhores-exercicios-para-fazer-na-academia-662c10cfdc18c.jpg',
    },
    {
      title: 'Remada Curvada',
      description: '2 Séries x 15 Repetições',
      url: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/05/05/1301740817-remada-curvada.jpg',
    },
    {
      title: 'Remada Unilateral',
      description: '4 Séries x 10 Repetições',
      url: 'https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-2.jpg',
    },
    {
      title: 'Levantamento Terra',
      description: '3 Séries x 15 Repetições',
      url: 'https://www.espaco360med.com.br/images/blog/main/large/10-fatos-que-farao-voce-incluir-o-levantamento-terra-no-seu-treino-.jpg',
    },
  ])
  const [groups, setGroups] = useState<string[]>([
    'Costas',
    'Bíceps',
    'Tríceps',
    'Ombro',
    'Peito',
  ])
  const [groupSelected, setGroupSelected] = useState(groups[0])

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
        showsHorizontalScrollIndicator
      />

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
          keyExtractor={(item) => item.title}
          data={exercises}
          renderItem={({ item }) => (
            <ExerciseCard
              title={item.title}
              description={item.description}
              imageURL={item.url}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </VStack>
    </VStack>
  )
}
