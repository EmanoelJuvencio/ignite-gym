import { Input as GlueStackInput, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type TInputProps = ComponentProps<typeof InputField>

export function Input({ ...rest }: TInputProps) {
  return (
    <GlueStackInput
      bg='$gray700'
      h='$14'
      px='$4'
      borderWidth='$0'
      borderRadius='$md'
      $focus={{
        borderWidth: 1,
        borderColor: '$green500',
      }}
    >
      <InputField
        color='$white'
        fontFamily='$body'
        placeholderTextColor='$gray300'
        keyboardAppearance='dark'
        {...rest}
      />
    </GlueStackInput>
  )
}
