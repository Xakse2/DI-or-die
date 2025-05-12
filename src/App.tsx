import { Button } from '@/components/ui/button/button';
import { useState } from 'react';
import { registerUser } from './api/register';
import { loginUser } from './api/auth';
import { getClientCredentialsToken } from './api/get-token';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { setToken } from './app/slices/tokenSlice';

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.tokenSlice.accessToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGetToken = async () => {
    try {
      const token = await getClientCredentialsToken();
      dispatch(setToken(token));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser({ email, password }, token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <Button onClick={handleGetToken}>Get Token</Button>
      <Button onClick={handleRegister}>Register User</Button>
      <Button onClick={handleLogin}>Login User</Button>
    </div>
  );
}

export default App;
