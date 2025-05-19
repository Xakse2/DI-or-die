import { baseAuthURL, clientId, clientSecret } from '@/const/api-data';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clientTokenApi = createApi({
  reducerPath: 'clientTokenApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseAuthURL}/oauth`,
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }),
  endpoints: builder => ({
    getClientToken: builder.mutation<
      {
        [x: string]: string;
        access_token: string;
      },
      void
    >({
      query: () => ({
        url: '/token',
        method: 'POST',
        body: 'grant_type=client_credentials',
      }),
    }),
  }),
});

export const { useGetClientTokenMutation } = clientTokenApi;
