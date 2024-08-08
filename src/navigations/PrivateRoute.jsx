import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, path }) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDataAdmin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const result = await response.json();
      setUserData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getDataAdmin();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !token || !userData || userData.role !== 'admin') {
    return (
      <Navigate
        to={path || '/'}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
