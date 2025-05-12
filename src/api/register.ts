import axios from 'axios';
import { projectKey } from '@/const/api-date';
import type { RegisterPayload } from '@/interfaces/register-payload';

const apiUrl = `https://api.europe-west1.gcp.commercetools.com/${projectKey}/me/signup`;

export async function registerUser(payload: RegisterPayload, token: string) {
  const response = await axios.post(apiUrl, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
