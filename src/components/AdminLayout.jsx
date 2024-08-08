import { MdDashboard, MdError } from 'react-icons/md';
import Sidebar from './Sidebar';
import { FaListUl } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const SideBarItems = [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: <MdDashboard />,
    },
    {
      title: 'Users Watchlist',
      url: '/admin/users-watchlist',
      icon: <FaListUl />,
    },
  ];
  return (
    <>
      <div className="flex lg:flex md:flex sm:hidden hidden">
        <div className="lg:ml-[20%] md:ml-[30%] sm:ml-0 ml-0 w-full px-10 py-7 h-auto min-h-screen overflow-auto bg-white">{children}</div>

        <Sidebar lists={SideBarItems} />
      </div>
      <div className="w-full h-screen lg:hidden md:hidden sm:flex flex justify-center items-center text-white">
        <div className="flex flex-col justify-center items-center gap-2">
          <MdError size={150} />
          <h1 className="text-md font-semibold">For admin panel, you can open in dekstop only.</h1>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
