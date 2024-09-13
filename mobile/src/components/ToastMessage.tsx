import {
  Box,
  Icon,
  Pressable,
  Toast,
  ToastDescription,
  ToastTitle,
} from '@gluestack-ui/themed'
import { XCircle } from 'lucide-react-native'

type TToastMessageProps = {
  id: string
  title: string
  description?: string
  action?: 'error' | 'success'
  onClose: () => void
}

export function ToastMessage({
  id,
  title,
  description,
  action = 'success',
  onClose,
}: TToastMessageProps) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      bg={action === 'success' ? '$green500' : '$red500'}
      flexDirection='column'
    >
      <Box
        flexDirection='row'
        w='$full'
        gap={10}
        justifyContent='space-between'
        alignItems='center'
      >
        <ToastTitle
          flex={1}
          numberOfLines={2}
          color='$white'
          fontFamily='$heading'
        >
          {title}
        </ToastTitle>
        <Pressable alignItems='center' onPress={onClose}>
          <Icon as={XCircle} color='$coolGray50' size='lg' />
        </Pressable>
      </Box>

      {description && (
        <Box mt='$2' pt='$4' borderTopWidth={0.2} borderColor='$coolGray100'>
          <ToastDescription color='$white' fontFamily='$body'>
            {description}
          </ToastDescription>
        </Box>
      )}
    </Toast>
  )
}
