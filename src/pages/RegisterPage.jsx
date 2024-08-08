import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}/register`,
        {
          username,
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.status === 201) {
        setMessage('User registered successfully. Verification email sent.');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.log(error);
      console.error('Error during registration:', error.response?.data || error.message);
      setMessage(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#12101D] py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl md:text-3xl text-white bg-[#DA7086] mb-10 px-4 py-2 rounded-md">Good Movies</h1>
      <div className="max-w-md w-full space-y-8  border-black shadow py-4 px-6 bg-blue-gray-900 rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-white">Sign up for an account</h2>
          <h1 className="text-center text-white mt-10 ">{message}</h1>
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
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-white"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <div className="flex flex-col gap-2 mb-5">
              <label
                htmlFor="confirm-password"
                className="text-white"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account?
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
