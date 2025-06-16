import { storage } from '@/service/local-storage';
import { useGetAnonymousSessionMutation } from '@/app/slices/api-anonim';

export function useAnonymousToken() {
  const [getAnonymousSession] = useGetAnonymousSessionMutation();

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

    return activeToken;
  };
  return { getToken };
}
