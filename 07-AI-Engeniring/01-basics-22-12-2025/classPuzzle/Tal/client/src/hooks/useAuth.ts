import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../store/store';
import { setUser, clearUser } from '../store/authSlice';
import { useGetMeQuery, useLogoutMutation } from '../store/api/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  const { data, isLoading, isError, isFetching } = useGetMeQuery(undefined, {
    skip: isAuthenticated && hasCheckedAuth,
  });
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (data?.success && data.data) {
      dispatch(setUser(data.data));
      setHasCheckedAuth(true);
    } else if (isError) {
      dispatch(clearUser());
      setHasCheckedAuth(true);
    }
  }, [data, isError, dispatch]);

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    setHasCheckedAuth(false);
  };

  // Still loading if: fetching OR (not authenticated AND haven't checked yet)
  const stillLoading = isLoading || isFetching || (!isAuthenticated && !hasCheckedAuth && !isError);

  return {
    user,
    isAuthenticated,
    isLoading: stillLoading,
    logout: handleLogout,
  };
};
