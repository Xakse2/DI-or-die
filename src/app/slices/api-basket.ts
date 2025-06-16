import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiURL, projectKey } from '@/const/api-data';
import { storage } from '@/service/local-storage';
import type { Cart, CartAction } from '@/interfaces/cartResponse';

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
  tagTypes: ['Basket'],
  endpoints: builder => ({
    getNewBasket: builder.mutation({
      query: body => ({
        url: '/me/carts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Basket'],
    }),
    checkActiveBasket: builder.query<Cart | null, void>({
      query: () => ({
        url: '/me/active-cart',
        method: 'GET',
      }),
      providesTags: [{ type: 'Basket' }],
    }),
    getUserBasket: builder.query<{ id: string } | null, void>({
      query: () => ({
        url: '/me/carts',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    updateCart: builder.mutation<
      Cart,
      { cartId: string; version: number; actions: CartAction[] }
    >({
      query: ({ cartId, version, actions }) => ({
        url: `/me/carts/${cartId}`,
        method: 'POST',
        body: { version, actions },
      }),
    }),
    deleteCart: builder.mutation<Cart, { cartId: string; version: number }>({
      query: ({ cartId, version }) => ({
        url: `/me/carts/${cartId}?version=${version}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Basket'],
    }),
  }),
});

export const {
  useGetNewBasketMutation,
  useCheckActiveBasketQuery,
  useGetUserBasketQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = basketCreateApi;
