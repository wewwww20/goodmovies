import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      const user = await fetch(`${import.meta.env.VITE_APP_BACKEND}/user/${data.userId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const userData = await user.json();
      if (userData.role === 'admin') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        navigate('/admin');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        navigate('/');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#12101D] py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl md:text-3xl text-white bg-[#DA7086] mb-10 px-4 py-2 rounded-md">Good Movies</h1>
      <div className="max-w-md w-full space-y-8 border-black shadow py-4 px-6 bg-blue-gray-900 rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-white">Sign in to your account</h2>
          <h1 className="text-center text-white mt-10">{message}</h1>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="remember"
            defaultValue="true"
          />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex flex-col gap-2 mb-5">
              <label
                htmlFor="email-address"
                className="text-white"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mb-5">
              <label
                htmlFor="password"
                className="text-white"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don&apos;t Have an Account?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#DA7086] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-white group-hover:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
