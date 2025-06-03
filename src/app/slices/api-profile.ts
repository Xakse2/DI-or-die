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
      query: () => '',
    }),
    updateUserProfile: builder.mutation({
      query: ({ version, actions }) => ({
        url: '',
        method: 'POST',
        body: {
          version,
          actions,
        },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ version, currentPassword, newPassword }) => ({
        url: '/password',
        method: 'POST',
        body: {
          version,
          currentPassword,
          newPassword,
        },
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = userProfileApi;
