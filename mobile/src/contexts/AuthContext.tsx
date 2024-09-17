import { createContext, ReactNode, useState } from 'react'
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
  const [user, setUser] = useState({
    id: '1',
    name: 'Emanoel',
    email: 'emanoeljuvencio@gmail.com',
    avatar: 'emanoel.png',
  })

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
