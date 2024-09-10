import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Icon,
} from '@gluestack-ui/themed'

import { ChevronRight } from 'lucide-react-native'

type TExerciseCardProps = TouchableOpacityProps & {
  imageURL?: string
  title: string
  description: string
}

export function ExerciseCard({
  title,
  description,
  imageURL = '',
  ...rest
}: TExerciseCardProps) {
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
            uri: imageURL,
          }}
        />

        <VStack flex={1}>
          <Heading color='$white' fontSize='$lg' fontFamily='$heading'>
            {title}
          </Heading>
          <Text
            color='$gray200'
            fontSize='$sm'
            mt='$1'
            numberOfLines={2}
            fontFamily='$body'
          >
            {description}
          </Text>
        </VStack>

        <Icon as={ChevronRight} size='xl' color='$gray300' />
      </HStack>
    </TouchableOpacity>
  )
}
