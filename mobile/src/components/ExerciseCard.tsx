import {
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { TExerciseDTO } from '@dtos/ExerciseDTO'
import { api } from '@services/api'
import { ChevronRight } from 'lucide-react-native'

type TExerciseCardProps = TouchableOpacityProps & {
  data: TExerciseDTO
}

export function ExerciseCard({ data, ...rest }: TExerciseCardProps) {
  const { name, series, repetitions, thumb, demo } = data
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg='$gray500'
        alignItems='center'
        p='$2'
        pr='$4'
        mb='$3'
        rounded='$md'
      >
        <Image
          alt='Imagem do Exercício'
          w='$16'
          h='$16'
          rounded='$md'
          mr='$4'
          bg='$gray600'
          resizeMode='cover'
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${thumb}`,
          }}
        />

        <VStack flex={1}>
          <Heading color='$white' fontSize='$lg' fontFamily='$heading'>
            {name}
          </Heading>
          <Text
            color='$gray200'
            fontSize='$sm'
            mt='$1'
            numberOfLines={2}
            fontFamily='$body'
          >
            {`${series} Series x ${repetitions} repetições`}
          </Text>
        </VStack>

        <Icon as={ChevronRight} size='xl' color='$gray300' />
      </HStack>
    </TouchableOpacity>
  )
}
