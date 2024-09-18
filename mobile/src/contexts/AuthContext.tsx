import { createContext, ReactNode, useState } from 'react'

import { TUserDTO } from '@dtos/UserDTO'

import { api } from '@services/api'

export type TAuthContextDataProps = {
  user: TUserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

type TAuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<TAuthContextDataProps>(
  {} as TAuthContextDataProps
)

export function AuthContextProvider({ children }: TAuthContextProviderProps) {
  const [user, setUser] = useState({} as TUserDTO)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  function signOut() {
    setUser({} as TUserDTO)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
