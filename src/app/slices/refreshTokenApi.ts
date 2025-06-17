import {
  baseAuthURL,
  clientId,
  clientSecret,
  projectKey,
} from '@/const/api-data';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const refreshTokenApi = createApi({
  reducerPath: 'refreshTokenApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseAuthURL}/oauth/${projectKey}/customers`,
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }),
  endpoints: builder => ({
    refreshToken: builder.mutation<
      { access_token: string; refresh_token: string },
      string
    >({
      query: (refreshToken: string) => ({
        url: '/token',
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      }),
    }),
  }),
});

export const { useRefreshTokenMutation } = refreshTokenApi;
