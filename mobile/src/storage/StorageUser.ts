import { TUserDTO } from '@dtos/UserDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_STORAGE } from './StorageConfig'

export async function storageUserSafe(user: TUserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user: TUserDTO = storage ? JSON.parse(storage) : {}

  return user
}

export async function storageUserClear() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
