import { ComponentProps } from 'react'
import {
  Button as GlueStackButton,
  ButtonSpinner,
  Heading,
} from '@gluestack-ui/themed'

type TButtonProps = ComponentProps<typeof GlueStackButton> & {
  title: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button({
  isLoading = false,
  variant = 'solid',
  title,
  ...rest
}: TButtonProps) {
  return (
    <GlueStackButton
      w='$full'
      h='$14'
      bg={variant === 'outline' ? 'transparent' : '$green700'}
      borderWidth={variant === 'outline' ? '$1' : '$0'}
      borderColor='$green500'
      rounded='$sm'
      $active-bg={variant === 'outline' ? '$trueGray900' : '$green500'}
      disabled={isLoading}
      aria-label={title}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color={variant === 'outline' ? '$green500' : '$white'} />
      ) : (
        <Heading
          color={variant === 'outline' ? '$green500' : '$white'}
          $active-color='$white'
          fontFamily='$heading'
          fontSize='$sm'
        >
          {title}
        </Heading>
      )}
    </GlueStackButton>
  )
}
