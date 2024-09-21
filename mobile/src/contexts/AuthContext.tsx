import { createContext, ReactNode, useEffect, useState } from 'react'

import { TUserDTO } from '@dtos/UserDTO'

import { api } from '@services/api'

import {
  storageUserClear,
  storageUserGet,
  storageUserSave,
} from '@storage/storageUser'
import {
  storageAuthTokenClear,
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'

export type TAuthContextProps = {
  user: TUserDTO
  isLoadingUserStorageData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

type TAuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<TAuthContextProps>(
  {} as TAuthContextProps
)

export function AuthContextProvider({ children }: TAuthContextProviderProps) {
  const [user, setUser] = useState({} as TUserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  function userAndTokenUpdate(userData: TUserDTO, token: string) {
    setUser(userData)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  async function storageUserAndTokenSave(userData: TUserDTO, token: string) {
    try {
      await storageUserSave(userData)
      await storageAuthTokenSave(token)
    } catch (error) {
      throw error
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user && data.token) {
        setIsLoadingUserStorageData(true)
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)
      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()
      if (userLogged && token) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      await storageUserClear()
      await storageAuthTokenClear()
      setUser({} as TUserDTO)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
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
