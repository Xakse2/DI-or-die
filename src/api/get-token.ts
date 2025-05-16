import axios from 'axios';
import { baseAuthURL, clientId, clientSecret } from '@/const/api-data';

const authUrl = `${baseAuthURL}/oauth/token`;

export async function getClientCredentialsToken(): Promise<string> {
  const response = await axios.post(authUrl, 'grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
}
