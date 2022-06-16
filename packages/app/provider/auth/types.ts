export type User = {
  email: string
  password: string
}

export type AuthData = {
  userId: string
  token: string
  refreshToken: string
}

export type AuthDataResponse = {
  data: AuthData
}
