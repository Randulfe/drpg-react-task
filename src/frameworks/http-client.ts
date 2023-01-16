import axios from 'axios';
import { USERS_URL } from './constants';
import { UserResponse, UsersResponse } from './types';

export async function getUsers(page: number) {
  const url = page ? `asd${USERS_URL}?page=${page}` : USERS_URL;
  return await axios.get(url);
}

export async function updateUser(user: UserResponse): Promise<UsersResponse> {
  return await axios.put(`${USERS_URL}/${user.id}`, user);
}
