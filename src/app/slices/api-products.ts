/* eslint-disable no-useless-escape */
import { createApi } from '@reduxjs/toolkit/query/react';
import type {
  ProductsResponse,
  SingleProductResponse,
} from '@/interfaces/prodactResponse';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,

  endpoints: builder => ({
    getAllProducts: builder.query<
      ProductsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `query {
  products ( offset: ${(page - 1) * limit}, limit: ${limit} ) {
    total
    results {
      id
      masterData {
        current {
          name(locale: "en-GB")
          masterVariant {
            sku
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
    getCategoryProducts: builder.query<
      ProductsResponse,
      { attribute: string; value: string }
    >({
      query: ({ attribute, value }) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `query {
            products ( limit: 10,
      where: "masterData(current(masterVariant(attributes(name=\\\"${attribute}\\\" and value(key=\\\"${value}\\\")))) )"
    ) {
      results {
      id
        masterData {
          current {
            name(locale: "en-GB")
            masterVariant {
              sku
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
    getProductCard: builder.query<SingleProductResponse, { id: string }>({
      query: ({ id }) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `query {
          product (id: "${id}") {
    skus
    masterData {
      current {
        name(locale: "en-GB")
        description(locale: "en-GB")
        allVariants {
          sku
          images {
            url
          }
          prices {
            value {
              centAmount
              currencyCode
            }
            discounted {
              value {
                centAmount
                currencyCode
              }
            }
          }
          attributesRaw {
            name
            value
        }
            }
        }
      }
    }
  }`,
        },
      }),
      transformResponse: (response: { data: SingleProductResponse }) =>
        response.data,
    }),
    getDiscountedProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `query {
            products ( limit: 10,
      where: "masterData(current(masterVariant(prices(discounted(value(centAmount > 0))))))"
    ) {
      results {
      id
        masterData {
          current {
            name(locale: "en-GB")
            masterVariant {
              sku
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

export const {
  useGetAllProductsQuery,
  useGetCategoryProductsQuery,
  useGetProductCardQuery,
  useGetDiscountedProductsQuery,
} = productsApi;
