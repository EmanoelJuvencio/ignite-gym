import { Input as GlueStackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type TInputProps = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
}

export function Input({ isReadOnly = false, ...rest }: TInputProps) {
  return (
    <GlueStackInput
      h='$14'
      borderWidth='$0'
      borderRadius='$md'
      $focus={{
        borderWidth: 1,
        borderColor: '$green500',
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
    >
      <InputField
        bg='$gray700'
        color='$white'
        fontFamily='$body'
        px='$4'
        placeholderTextColor='$gray300'
        keyboardAppearance='dark'
        {...rest}
      />
    </GlueStackInput>
  )
}
