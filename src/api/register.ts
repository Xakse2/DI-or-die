import axios from 'axios';
import { baseApiURL, projectKey } from '@/const/api-data';
import type { RegisterPayload } from '@/interfaces/register-payload';

const apiUrl = `${baseApiURL}/${projectKey}/me/signup`;

export async function registerUser(payload: RegisterPayload, token: string) {
  const response = await axios.post(apiUrl, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
