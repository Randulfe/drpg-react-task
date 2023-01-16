export type UsersData = {
  page: number;
  total: number;
  data: Array<UserData>;
};

export type UserData = {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
};
