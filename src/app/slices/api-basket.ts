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
      console.log(headers.get('Authorization'));
      return headers;
    },
  }),

  endpoints: builder => ({
    getNewBasket: builder.mutation({
      query: body => ({
        url: '/me/carts',
        method: 'POST',
        body,
      }),
    }),
    checkActiveBasket: builder.query<{ id: string } | null, void>({
      query: () => ({
        url: '/me/active-cart',
        method: 'GET',
      }),
    }),
    getUserBasket: builder.query<{ id: string } | null, void>({
      query: () => ({
        url: '/me/carts',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const {
  useGetNewBasketMutation,
  useCheckActiveBasketQuery,
  useGetUserBasketQuery,
} = basketCreateApi;
