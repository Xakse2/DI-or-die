/* eslint-disable no-useless-escape */
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
  products ( limit: 10 ) {
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
    getCategoryProducts: builder.query<
      ProductsResponse,
      { attribute: string; value: string }
    >({
      query: ({ attribute, value }) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `query {
            products( limit: 10,
      where: "masterData(current(masterVariant(attributes(name=\\\"${attribute}\\\" and value(key=\\\"${value}\\\")))) )"
    ) {
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
              discounted {
                value {
                  centAmount
                  currencyCode
                }
              }
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

export const { useGetAllProductsQuery, useGetCategoryProductsQuery } =
  productsApi;
