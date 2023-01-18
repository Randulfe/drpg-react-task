export interface UsersResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: UserResponse[]
}

export interface UserResponse {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}
