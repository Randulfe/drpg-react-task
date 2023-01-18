import axios from 'axios'
import { USERS_URL } from './constants'
import { UserResponse } from './types'

export async function getUsers (page: number) {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const url = page ? `${USERS_URL}?page=${page}` : USERS_URL
  return await axios.get(url)
}

export async function updateUser (user: UserResponse) {
  return await axios.put(`${USERS_URL}/${user.id}`, user)
}
