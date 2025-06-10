import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiURL, projectKey } from '@/const/api-data';
import { storage } from '@/service/local-storage';

export const basketCreateApi = createApi({
  reducerPath: 'basketCreateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiURL}/${projectKey}`,
    prepareHeaders: headers => {
      const authToken = storage.getData('authToken');
      const anonymousToken = storage.getData('anonymousToken');
      const token = authToken ?? anonymousToken;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: builder => ({
    getNewBasket: builder.mutation({
      query: body => ({
        url: 'me/carts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    getUserBasket: builder.query({
      query: () => ({
        url: 'me/carts/active-cart',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const { useGetNewBasketMutation, useGetUserBasketQuery } =
  basketCreateApi;
