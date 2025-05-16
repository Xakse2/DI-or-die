import axios from 'axios';
import {
  baseAuthURL,
  clientId,
  clientSecret,
  projectKey,
} from '@/const/api-data';

const authUrl = `${baseAuthURL}/oauth/${projectKey}/anonymous/token`;

export async function getTokenAnonymous(): Promise<string> {
  const response = await axios.post(authUrl, 'grant_type=anonymous', {
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
}
