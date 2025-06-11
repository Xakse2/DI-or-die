import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  baseAuthURL,
  projectKey,
  clientId,
  clientSecret,
} from '@/const/api-data';

export const anonymousToken = createApi({
  reducerPath: 'anonymousToken',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseAuthURL}/oauth/${projectKey}`,
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }),
  endpoints: builder => ({
    getAnonymousSession: builder.mutation({
      query: () => ({
        url: '/anonymous/token',
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }).toString(),
      }),
    }),
  }),
});

export const { useGetAnonymousSessionMutation } = anonymousToken;
