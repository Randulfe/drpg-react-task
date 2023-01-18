import { useQuery } from '@tanstack/react-query'
import { UserData } from '../components/types'
import { getUsers, updateUser } from '../http/http-client'
import { UserResponse } from '../http/types'

export async function getUsersData (page: number) {
  try {
    const { data } = await getUsers(page)
    return {
      page: data.page,
      total: data.total,
      data: data.data.map(
        (item: UserResponse) =>
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          ({
            id: item.id,
            avatar: item.avatar,
            firstName: item.first_name,
            lastName: item.last_name,
            email: item.email
          } as UserData)
      )
    }
  } catch (e) {
    throw new Error('getUsersData')
  }
}

export async function updateUserData (payload: UserData) {
  const user: UserResponse = {
    id: payload.id,
    email: payload.email,
    first_name: payload.firstName,
    last_name: payload.lastName,
    avatar: payload.avatar
  }
  try {
    const { data } = await updateUser(user)
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return ({
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      avatar: data.avatar
    } as UserData)
  } catch (e) {
    throw new Error('userUpdate')
  }
}

export function useGetUsers (page: number) {
  return useQuery(['users', page], async () => await getUsersData(page))
}
