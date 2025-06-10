import { useGetAnonymousSessionQuery } from '@/app/slices/api-anonim';
import { storage } from '@/service/local-storage';
import { useEffect } from 'react';

export const useAnonymousSession = () => {
  const existingToken = storage.getData('anonymousToken');
  const { data, error } = useGetAnonymousSessionQuery(
    {
      anonymous_id: 'guest-session',
    },
    {
      skip: !!existingToken,
    },
  );

  useEffect(() => {
    if (data?.access_token) {
      storage.setData('anonymousToken', data.access_token);
    }
  }, [data]);

  if (error) {
    console.error('Error get anonymous token:', error);
  }

  return { token: existingToken ?? data?.access_token };
};
