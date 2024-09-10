import { ComponentProps } from 'react'
import { Button, Text } from '@gluestack-ui/themed'

type TGroupProps = ComponentProps<typeof Button> & {
  isActive?: boolean
  name: string
}

export function Group({ name, isActive = false, ...rest }: TGroupProps) {
  return (
    <Button
      minWidth='$24'
      h='$10'
      mr='$3'
      bg='$gray600'
      rounded='$md'
      borderWidth={isActive ? 1 : 0}
      borderColor='$green500'
      sx={{
        ':active': {
          borderWidth: 1,
        },
      }}
      {...rest}
    >
      <Text
        color={isActive ? '$green500' : '$gray200'}
        textTransform='uppercase'
        fontSize='$xs'
        fontFamily='$heading'
      >
        {name}
      </Text>
    </Button>
  )
}
