import { createContext } from 'react'
import { TUserDTO } from '@dtos/UserDTO'

export type TAuthContextDataProps = {
  user: TUserDTO
}

export const AuthContext = createContext<TAuthContextDataProps>(
  {} as TAuthContextDataProps
)
