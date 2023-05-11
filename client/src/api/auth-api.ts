import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const SERVER_API_DEV = 'http://localhost:3001/api/v1/'

export enum API_URLS {
  Login = 'auth/login',
  Register = 'auth/register',
  Logout = 'auth/logout',
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  role: string
  username: string
}

export interface User {
  username: string
  email: string
  role: string
  id: string
}

export interface LoginResponse {
  token: string
  user: User
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_API_DEV,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginDto>({
      query: (body) => ({ url: API_URLS.Login, method: 'POST', body }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled
        localStorage.setItem('token', response.data.token)
      },
    }),
    register: build.mutation<LoginResponse, RegisterDto>({
      query: (body) => ({ url: API_URLS.Register, method: 'POST', body }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled
        localStorage.setItem('token', response.data.token)
      },
    }),
    logout: build.mutation({
      query: () => ({ url: API_URLS.Logout, method: 'POST' }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        await queryFulfilled
        localStorage.removeItem('token')
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi
