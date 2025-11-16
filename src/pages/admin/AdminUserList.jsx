import React, { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';
import ClientApiInstance from '../../api/axiosIntercepter';
import { toast } from 'react-toastify';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ClientApiInstance.get('/api/admin/users');
        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (err) {
        toast.error("Failed to fetch users.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <FiLoader className="w-12 h-12 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <h2 className="text-3xl font-bold text-amber-900">👥 All Users</h2>
        <p className="text-sm text-amber-700 mt-1">Total Users: <span className="font-bold">{users.length}</span></p>
      </div>
      <div className="p-6">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left">
              <thead>
                <tr className="border-b-2 border-amber-200 bg-amber-50">
                  <th className="p-4 font-bold text-amber-900">ID</th>
                  <th className="p-4 font-bold text-amber-900">Name</th>
                  <th className="p-4 font-bold text-amber-900">Email</th>
                  <th className="p-4 font-bold text-amber-900">Mobile</th>
                  <th className="p-4 font-bold text-amber-900">Role</th>
                  <th className="p-4 font-bold text-amber-900">Status</th>
                  <th className="p-4 font-bold text-amber-900">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-amber-50 transition-colors duration-150">
                    <td className="p-4 font-semibold text-amber-600">#{user.id}</td>
                    <td className="p-4 font-semibold text-slate-800">{user.name}</td>
                    <td className="p-4 text-slate-700">{user.email}</td>
                    <td className="p-4 text-slate-700">{user.mobile}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;