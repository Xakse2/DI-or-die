import { clientId, clientSecret, projectKey } from '@/const/api-date';
import axios from 'axios';

const authUrl = `https://auth.europe-west1.gcp.commercetools.com/oauth/${projectKey}/customers/token`;

export async function loginUser(
  username: string,
  password: string,
): Promise<string> {
  const credentials = btoa(`${clientId}:${clientSecret}`);

  const response = await axios.post(
    authUrl,
    new URLSearchParams({
      grant_type: 'password',
      username,
      password,
    }),
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return response.data.access_token;
}
