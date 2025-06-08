import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiURL, projectKey } from '@/const/api-data';
import { storage } from '@/service/local-storage';
// import { baseQueryWithReauth } from './baseQueryWithReauth';

export const basketCreateApi = createApi({
  reducerPath: 'basketCreateApi',
  // baseQuery: baseQueryWithReauth,
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiURL}/${projectKey}`,
    prepareHeaders: headers => {
      const token = storage.getData('anonymousToken');
      console.log(token);
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
  }),
});

export const { useGetNewBasketMutation } = basketCreateApi;
