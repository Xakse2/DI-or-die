import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiURL, projectKey } from '@/const/api-data';
import type { RegisterPayload } from '@/interfaces/register-payload';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiURL}/${projectKey}/me`,
  }),
  endpoints: builder => ({
    registerUser: builder.mutation<
      void,
      { payload: RegisterPayload; token: string }
    >({
      query: ({ payload, token }) => ({
        url: '/signup',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = registerApi;
