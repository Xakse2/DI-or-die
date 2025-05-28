import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiURL, projectKey } from '@/const/api-data';
import { storage } from '@/service/local-storage';

export const userProfileApi = createApi({
  reducerPath: 'userProfileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiURL}/${projectKey}/me`,
    prepareHeaders: headers => {
      const token = storage.getData('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getUserProfile: builder.query({
      query: () => '/profile',
    }),
  }),
});

export const { useGetUserProfileQuery } = userProfileApi;