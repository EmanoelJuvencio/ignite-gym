import { createContext, ReactNode, useState } from 'react'
import { useToast } from '@gluestack-ui/themed'

import { TUserDTO } from '@dtos/UserDTO'

import { ToastMessage } from '@components/ToastMessage'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'

export type TAuthContextDataProps = {
  user: TUserDTO
  signIn: (email: string, password: string) => Promise<void>
}

type TAuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<TAuthContextDataProps>(
  {} as TAuthContextDataProps
)

export function AuthContextProvider({ children }: TAuthContextProviderProps) {
  const [user, setUser] = useState({} as TUserDTO)
  const toast = useToast()

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      const errorMessage =
        error instanceof AppError
          ? error.message
          : 'Não foi possível acessar conta, tente novamente mais tarde.'
      return toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action='error'
            title='Erro ao acessar conta'
            description={errorMessage}
            onClose={() => toast.close(id)}
          />
        ),
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
