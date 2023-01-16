export type UsersResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Array<UserResponse>;
};

export type UserResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
