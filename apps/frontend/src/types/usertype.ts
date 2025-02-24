export interface AuthPayload {
  email: string;
  password: string;
}

export interface AllUserType {
  id: string;
  username: string;
  email: string;
  avatar: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}
