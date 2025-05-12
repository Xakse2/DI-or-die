import axios from 'axios';
import { clientId, clientSecret, projectKey } from '@/const/api-date';

const authUrl = `https://auth.europe-west1.gcp.commercetools.com/oauth/${projectKey}/anonymous/token`;

export async function getTokenAnonyms(): Promise<string> {
  const response = await axios.post(authUrl, 'grant_type=anonymous', {
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
}
