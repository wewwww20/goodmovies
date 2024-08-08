const Sidebar = ({ lists }) => {
  console.log(lists);
  const url = new URL(window.location.href);
  const pathname = url.pathname;
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_APP_BACKEND}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className={`w-64 h-screen fixed bg-blue-500 flex flex-col justify-between p-5`}>
      <div className="">
        <div className="flex justify-between items-center">
          <h1 className="text-white font-semibold text-xl">Admin Panel</h1>
        </div>
        <div className="flex flex-col gap-2 mt-7">
          {lists.map((item, index) => (
            <a
              href={item.url}
              key={item.title}
              className={`flex items-center gap-2 p-2 rounded-lg text-sm font-semibold hover:bg-color-primary hover:text-color-dark hover:ease-in-out hover:duration-300 ${pathname == item.url && item.url !== '' ? 'bg-white text-blue-500' : 'text-white'}`}
            >
              <p className="text-lg">{item.icon}</p>
              <h4>{item.title}</h4>
            </a>
          ))}
        </div>
      </div>
      <button
        onClick={handleLogout}
        type="submit"
        className="bg-white w-full text-blue-500 font-semibold py-2 px-3 rounded-md text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
