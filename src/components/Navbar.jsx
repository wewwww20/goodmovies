import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [isAuth, setIsAuth] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_APP_BACKEND}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUsername(userData.username);
        setIsAuth(true);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        console.error("Error fetching user data:", error.message);
        setIsAuth(false);
      }
    };

    fetchUserData();
  }, [userId, token, navigate]);

  return (
    <>
      <nav
        className={`bg-blue-gray-900 p-4 flex items-center justify-between md:justify-around sticky top-0 z-[9999]`}
      >
        <div className="flex items-center z-[99]">
          <Link to={"/"} className="text-white text-xl font-bold">
            Good Movies
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to={"/now-playing"} className="text-white">
            Now Playing
          </Link>
          <Link to={"/popular"} className="text-white">
            Popular
          </Link>
          <Link to={"/upcoming"} className="text-white">
            Upcoming
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuth ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="focus:outline-none bg-white text-blue-gray-900 font-bold w-8 h-8 rounded-full flex items-center justify-center"
              >
                {username[0]}
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    to={"/profile"}
                    className="block px-4 py-2 text-gray-800"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              className="bg-[#DA7086] px-2 py-1 text-white rounded-md"
              to={"/login"}
            >
              Login / signup
            </Link>
          )}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={handleMenuToggle}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`md:hidden absolute top-[4rem] left-0 right-0 bg-blue-gray-900 text-white overflow-hidden transition-all duration-300 z-[9] ${
            isMenuOpen
              ? "animate__animated animate__slideInDown"
              : "animate__animated animate__slideOutUp"
          }`}
          style={{ display: isMenuOpen ? "block" : "none" }}
        >
          <Link to={"/now-playing"} className="block px-4 py-2">
            Now Playing
          </Link>
          <Link to={"/popular"} className="block px-4 py-2">
            Popular
          </Link>
          <Link to={"/upcoming"} className="block px-4 py-2">
            Upcoming
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
