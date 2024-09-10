import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed'

export type TExercises = {
  group: string
  exercise: string
  time: string
}

type THistoryCardProps = {
  data: TExercises
}

export function HistoryCard({ data }: THistoryCardProps) {
  const { exercise, group, time } = data
  return (
    <HStack
      w='$full'
      px='$5'
      py='$4'
      mb='$3'
      bg='$gray600'
      rounded='$md'
      justifyContent='space-between'
      alignItems='center'
    >
      <VStack mr='$5'>
        <Heading
          color='$white'
          fontSize='$md'
          fontFamily='$heading'
          textTransform='capitalize'
        >
          {group}
        </Heading>
        <Text color='$gray100' fontSize='$lg' numberOfLines={1}>
          {exercise}
        </Text>
      </VStack>

      <Text color='$gray300' fontSize='$md'>
        {time}
      </Text>
    </HStack>
  )
}
