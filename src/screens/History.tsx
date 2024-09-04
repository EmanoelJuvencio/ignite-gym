import { useState } from 'react'
import { SectionList } from 'react-native'
import { Heading, Text, VStack } from '@gluestack-ui/themed'

import { HistoryCard, TExercises } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

type TSectionExercises = {
  title: string
  data: TExercises[]
}

export function History() {
  const [sectionExercises, setSectionExercises] = useState<TSectionExercises[]>(
    [
      {
        title: '22.08.24',
        data: [
          { group: 'Costas', exercise: 'Puxada Frontal', time: '08:50' },
          { group: 'Costas', exercise: 'Puxada Unilateral', time: '09:10' },
        ],
      },
      {
        title: '25.08.24',
        data: [
          { group: 'Costas', exercise: 'Puxada Frontal', time: '10:30' },
          { group: 'Costas', exercise: 'Puxada Unilateral', time: '10:45' },
          { group: 'Costas', exercise: 'Remada Curvada', time: '11:01' },
          { group: 'Costas', exercise: 'Levantamento Terra', time: '11:22' },
        ],
      },
    ]
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de Exercícios' />

      <SectionList
        keyExtractor={(item) => item.exercise}
        sections={sectionExercises}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section }) => (
          <Heading
            fontFamily='$heading'
            color='$gray200'
            fontSize='$md'
            mt='$10'
            mb='$3'
          >
            {section.title}
          </Heading>
        )}
        style={{
          paddingHorizontal: 32,
        }}
        contentContainerStyle={
          sectionExercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text
            color='$gray100'
            textAlign='center'
            children={`Não há exercícios registrados ainda.\n vamos fazer exercícios hoje?`}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}
