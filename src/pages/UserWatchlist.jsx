import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Table } from 'antd';
import CardAdmin from '../components/CardAdmin';

const UserWatchlist = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [dataUsers, setDataUsers] = useState([]);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Watchlist',
      dataIndex: 'watchlist',
      key: 'watchlist',
      render: (watchlist) => (
        <div className="flex flex-wrap md:w-[85vw] mx-auto justify-around md:justify-start gap-4">
          {watchlist.map((movie, index) => (
            <CardAdmin
              key={index}
              id={movie.movie_id}
              title={movie.movie_name}
              year={movie.year}
              rating={movie.vote_average.toFixed(1)}
              poster={`${import.meta.env.VITE_APP_APIURLIMG}/${movie.movie_poster_url}`}
            />
          ))}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        console.log(userData);
        const filteredUserData = userData.filter((user) => user.role !== 'admin');
        setDataUsers(filteredUserData);

        setIsAuth(true);
      } catch (error) {
        console.log(error);
        console.error('Error fetching user data:', error.message);
        setIsAuth(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  return (
    <AdminLayout>
      <h1 className="text-2xl mb-7 font-semibold">Users Watchlist</h1>
      <Table
        dataSource={dataUsers.map((user) => ({ ...user, key: user.id }))}
        columns={columns}
      />
    </AdminLayout>
  );
};

export default UserWatchlist;
