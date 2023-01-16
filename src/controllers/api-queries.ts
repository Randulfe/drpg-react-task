import { useQuery } from '@tanstack/react-query';
import { UserData, UsersData } from '../components/types';
import { getUsers, updateUser } from '../frameworks/http-client';
import { UserResponse } from '../frameworks/types';

export async function getUsersData(page: number): Promise<UsersData | Error>  {
  try {
    const { data } = await getUsers(page);
    return {
      page: data.page,
      total: data.total,
      data: data.data.map(
        (item: UserResponse) =>
          ({
            id: item.id,
            avatar: item.avatar,
            firstName: item.first_name,
            lastName: item.last_name,
            email: item.email,
          } as UserData),
      ),
    };
  } catch (e) {
    return new Error('getUsersData');
  }
}

export async function updateUserData(payload: UserData) {
  const user: UserResponse = {
    id: payload.id,
    email: payload.email,
    first_name: payload.firstName,
    last_name: payload.lastName,
    avatar: payload.avatar,
  };
  try {
    const { data } = await updateUser(user);
    return data;
  } catch (e) {
    return new Error('userUpdate');
  }
}

export function useGetUsers(page: number) {
  console.log(getUsersData(page));
  return useQuery(['users', page], async () => await getUsersData(page));
}
