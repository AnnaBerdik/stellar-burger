import { useSelector } from '../../services/store';
import { getUser, getIsAuth } from '../../components/slices/userSlice';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader';

export interface TProtectedProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtectedProps) => {
  const isAuthChecked = useSelector(getIsAuth);
  const user = useSelector(getUser);
  const location = useLocation();

  if (isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
