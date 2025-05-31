import { createApi } from '@reduxjs/toolkit/query/react';
import type { ProductsResponse } from '@/interfaces/prodactResponse';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,

  endpoints: builder => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `query {
  products {
    total
    results {
      id
      masterData {
        current {
          allVariants {
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
              key
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
