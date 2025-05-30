import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiURL, projectKey } from '@/const/api-data';
import { storage } from '@/service/local-storage';
import type { ProductsResponse } from '@/interfaces/prodactResponse';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiURL}/${projectKey}/graphql`,
    prepareHeaders: headers => {
      const token = storage.getData('authToken');
      console.log(token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }

      return headers;
    },
  }),

  endpoints: builder => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: `query {
  products {
    total
    results {
      id
      masterData {
        current {
          masterVariant {
            attributesRaw {
              name
              value
            }
            prices {
              value {
                centAmount
                currencyCode
              }
            }
              images {
              url
            }
          }
        }
      }
    }
  }
}`,
        },
      }),
      transformResponse: (response: { data: ProductsResponse }) =>
        response.data,
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
