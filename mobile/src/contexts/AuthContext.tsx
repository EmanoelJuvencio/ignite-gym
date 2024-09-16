import { createContext, ReactNode } from 'react'
import { TUserDTO } from '@dtos/UserDTO'

export type TAuthContextDataProps = {
  user: TUserDTO
}

type TAuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<TAuthContextDataProps>(
  {} as TAuthContextDataProps
)

export function AuthContextProvider({ children }: TAuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'Emanoel',
          email: 'emanoeljuvencio@gmail.com',
          avatar: 'emanoel.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
