import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
// import { ReactComponent as EditIcon } from "../assets/edit-icon.svg"; // Assuming you have an SVG for the edit icon
import Card from "../components/Card"; // Assuming you have a Card component

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    const fetchUserData = async () => {
      try {
        setLoading(true);
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
        setUser(userData);
        setNewUsername(userData.username);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      } finally {
        setLoading(false);
      }
    };

    const fetchWatchlistData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND}/watchlist/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch watchlist");
        }

        const watchlistData = await response.json();
        setWatchlist(watchlistData);
      } catch (error) {
        console.error("Error fetching watchlist data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchWatchlistData();
  }, [navigate, token, userId]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUsernameChange = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND}/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newUsername }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      const updatedUser = await response.json();
      setUser((prevUser) => ({ ...prevUser, username: updatedUser.username }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating username:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="w-[95vw] md:w-[80vw] mx-auto mt-10">
        <div className="flex border-b-2 pb-10 mb-10 w-full h-[140px] flex-wrap items-center justify-center">
          <div className="w-[20%] md:w-[15%] h-full flex items-center ">
            <h1 className="h-[100px] w-[100px] bg-[#DA7086] flex items-center justify-center font-bold text-white rounded-full text-2xl md:text-3xl">
              {user.username && user.username.charAt(0)}
            </h1>
          </div>
          <div className="h-full md:h-[100px] flex flex-col justify-center px-5  gap-1  w-[75%] flex-wrap">
            <div className="flex items-center ">
              {!isEditing ? (
                <h1 className="text-white text-2xl md:text-3xl mr-16">
                  {user.username}
                </h1>
              ) : (
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="text-black px-2 py-1 rounded-md "
                />
              )}
              <button
                onClick={handleEdit}
                className={`ml-2 text-white border  px-2 py-1 rounded-md ${
                  isEditing && "bg-red-500"
                }`}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <button
                  onClick={handleUsernameChange}
                  className="ml-2 text-white bg-green-500 px-2 py-1 rounded-md"
                >
                  Save
                </button>
              )}
            </div>

            <h2 className="text-white text-lg">{user.email}</h2>
            <h2 className="text-white text-lg">Joined: {user.year}</h2>
          </div>
        </div>
        <h1 className="text-white text-2xl mt-5">Watchlist</h1>
        <div className="flex flex-wrap md:w-[85vw] mx-auto justify-start gap-4 mt-10">
          {watchlist.map((movie, i) => (
            <Card
              key={i}
              id={movie.movie_id}
              title={movie.movie_name}
              year={movie.year}
              rating={movie.vote_average.toFixed(1)}
              poster={`${import.meta.env.VITE_APP_APIURLIMG}${
                movie.movie_poster_url
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
