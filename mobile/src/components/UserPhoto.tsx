import { ComponentProps } from 'react'
import { Image } from '@gluestack-ui/themed'

type TUserPhotoProps = ComponentProps<typeof Image>

import UserImageDefault from '@assets/userPhotoDefault.png'
import { ImageSourcePropType } from 'react-native'

export function UserPhoto({ source, ...rest }: TUserPhotoProps) {
  function verifySource(
    source: string | ImageSourcePropType | undefined
  ): boolean {
    if (source === undefined) {
      return false
    }

    if (typeof source === 'string') {
      return source.trim() !== ''
    }

    // verifica se source é do tipo ImageSourcePropType
    if (Array.isArray(source)) {
      return source.every((item) => item.uri && item.uri.trim() !== '')
    }

    // source é um objeto ImageURISource ou ImageRequireSource
    const { uri } = source as { uri?: string } // ajustando o tipo
    return uri ? uri.trim() !== '' : false
  }

  return (
    <Image
      source={verifySource(source) ? source : UserImageDefault}
      rounded='$full'
      borderWidth='$2'
      backgroundColor='$gray500'
      borderColor='$gray400'
      alt='Imagem do Usuário'
      {...rest}
    />
  )
}
