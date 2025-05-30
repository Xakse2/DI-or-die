import type { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { clientTokenApi } from './api-get-token';
import { setToken } from './token-slice';
import { refreshTokenApi } from './refreshTokenApi';
import { baseApiURL, projectKey } from '@/const/api-data';

const BaseQuery = fetchBaseQuery({
  baseUrl: `${baseApiURL}/${projectKey}`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).tokenSlice.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  arguments_: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  let result = await BaseQuery(arguments_, api, extraOptions);

  if (result.error?.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.tokenSlice.RefreshToken;

    if (refreshToken) {
      const refreshResult = await api.dispatch(
        refreshTokenApi.endpoints.refreshToken.initiate(refreshToken),
      );

      if (refreshResult.data) {
        const newToken = refreshResult.data.access_token;
        api.dispatch(setToken(newToken));
        result = await BaseQuery(arguments_, api, extraOptions);
        return result;
      }
    }

    const clientTokenResult = await api.dispatch(
      clientTokenApi.endpoints.getClientToken.initiate(),
    );

    if (clientTokenResult.data) {
      const clientToken = clientTokenResult.data.access_token;
      api.dispatch(setToken(clientToken));
      result = await BaseQuery(arguments_, api, extraOptions);
    }
  }

  return result;
};
