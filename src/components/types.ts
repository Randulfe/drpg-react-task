export interface UsersData {
  page: number
  total: number
  data: UserData[]
}

export interface UserData {
  id: number
  avatar: string
  firstName: string
  lastName: string
  email: string
}
