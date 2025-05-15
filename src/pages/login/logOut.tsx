import { useDispatch } from 'react-redux';
// import { clearToken } from '@/store/tokenSlice';
import { setAuthenticated } from '@/app/slices/auth-slice';

export function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(clearToken());
    dispatch(setAuthenticated(false));
  };

  return <button onClick={handleLogout}>Logout</button>;
}
