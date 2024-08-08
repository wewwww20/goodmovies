import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  useEffect(() => {
    if (!token) {
      setMessage("Token is required");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND}/verify-email?token=${token}`
        );

        setMessage(response.data.message);
        navigate("/login");
      } catch (error) {
        setMessage(error.response?.data?.message || error.message);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);
  //   console.log(token);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#12101D] py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl md:text-3xl text-white bg-[#DA7086] mb-10 px-4 py-2 rounded-md">
        Good Movies
      </h1>
      <div className="max-w-md w-full space-y-8 border-black shadow py-4 px-6 bg-blue-gray-900 rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
            Email Verification
          </h2>
          <h1 className="text-center text-white mt-10">{message}</h1>
          <Link to={"/login"} className="px-2 py-1 bg-blue-500 mx-auto">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
