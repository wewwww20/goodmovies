import { GrHostMaintenance } from 'react-icons/gr';
import AdminLayout from '../components/AdminLayout';

const DashboardAdmin = () => {
  return (
    <AdminLayout>
      <div className="w-full h-screen flex justify-center items-center text-blue-900">
        <div className="flex flex-col justify-center items-center gap-4">
          <GrHostMaintenance size={150} />
          <h1 className="text-md mb-5 font-semibold italic">Sorry, Dashboard page still under development.</h1>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdmin;
