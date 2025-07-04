import type { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { clientTokenApi } from './api-get-token';
import { setRefreshToken, setToken } from './token-slice';
import { refreshTokenApi } from './refreshTokenApi';
import { baseApiURL, projectKey } from '@/const/api-data';
import { logout } from './auth-slice';

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
        const newRefreShToken = refreshResult.data.refresh_token;
        api.dispatch(setToken(newToken));
        api.dispatch(setRefreshToken(newRefreShToken));
        result = await BaseQuery(arguments_, api, extraOptions);
        return result;
      }

      api.dispatch(logout());
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
