import {
  baseAuthURL,
  clientId,
  clientSecret,
  projectKey,
} from '@/const/api-data';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseAuthURL}/oauth/${projectKey}/customers`,
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }),
  endpoints: builder => ({
    loginUser: builder.mutation<
      { access_token: string; refresh_token: string },
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: '/token',
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'password',
          username,
          password,
        }),
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginApi;
