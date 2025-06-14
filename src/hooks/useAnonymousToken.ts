import { storage } from '@/service/local-storage';
// import { useDispatch } from 'react-redux';
// import { setToken } from '@/app/slices/token-slice';
import { useGetAnonymousSessionMutation } from '@/app/slices/api-anonim';
// import { useState } from 'react';

export function useAnonymousToken() {
  const [getAnonymousSession] = useGetAnonymousSessionMutation();
  // const dispatch = useDispatch();

  // const [activeToken, setTokenReady] = useState<string>('');

  const getToken = async (): Promise<string | null> => {
    let activeToken: string | null =
      storage.getData('anonymousToken') ?? storage.getData('authToken');

    if (!activeToken) {
      try {
        const response = await getAnonymousSession({
          anonymous_id: 'guest-session',
        }).unwrap();
        console.log('Anonymous token', response.access_token);
        storage.setData('anonymousToken', response.access_token);
        activeToken = response.access_token;
      } catch (error) {
        console.error('Error get anonymous token:', error);
        activeToken = 'TOKEN_NOT_FOUND';
      }
    }
    // dispatch(setToken(activeToken));

    return activeToken;
  };
  return { getToken };
}
