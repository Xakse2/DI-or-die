import { useGetClientTokenMutation } from '@/app/slices/api-get-token';
import { useEffect } from 'react';
import { storage } from '@/service/local-storage';
import { useDispatch } from 'react-redux';
import { setToken } from '@/app/slices/token-slice';

export const useFetchToken = () => {
  const [getClientToken] = useGetClientTokenMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    getClientToken()
      .unwrap()
      .then(response => {
        storage.setData('accessToken', response.access_token);
        dispatch(setToken(response.access_token));
      })
      .catch(error => {
        console.error('Error get token:', error);
      });
  }, [getClientToken, dispatch]);
};
