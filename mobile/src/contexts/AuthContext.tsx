import { createContext, ReactNode, useEffect, useState } from 'react'

import { TUserDTO } from '@dtos/UserDTO'

import { api } from '@services/api'
import {
  storageUserClear,
  storageUserGet,
  storageUserSafe,
} from '@storage/StorageUser'

export type TAuthContextDataProps = {
  user: TUserDTO
  isLoadingUserStorageData: boolean
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
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user) {
        setUser(data.user)
        storageUserSafe(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()
      if (userLogged) {
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  function signOut() {
    setUser({} as TUserDTO)
    storageUserClear()
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
