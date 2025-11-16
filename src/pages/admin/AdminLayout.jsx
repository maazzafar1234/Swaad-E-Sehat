import React from 'react';
import { NavLink, Outlet, useNavigate  } from 'react-router-dom';
import { FiBox, FiClipboard, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminLayout = () => {

    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };
  return (
    <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 pt-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold font-serif text-amber-900 mb-8">
           Admin Panel - Swaad E Sehat
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Admin Sidebar */}
          <aside className="md:col-span-1">
            <nav className="bg-white rounded-xl shadow-lg p-6 sticky top-28 border-l-4 border-amber-500">
              <ul className="space-y-3">
                <AdminNavItem to="/admin/products" icon={<FiBox />}>
                  Products
                </AdminNavItem>
                <AdminNavItem to="/admin/orders" icon={<FiClipboard />}>
                  Orders
                </AdminNavItem>
                <AdminNavItem to="/admin/users" icon={<FiUsers />}>
                  Users
                </AdminNavItem>
                
                {/* Divider */}
                <li className="my-4 border-t border-gray-200"></li>
                
                <AdminNavItem to="/admin/settings" icon={<FiSettings />}>
                  Settings
                </AdminNavItem>
                 <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-slate-600 hover:bg-red-50 hover:text-red-600 font-medium"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Admin Content Area */}
          <main className="md:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

const AdminNavItem = ({ to, icon, children }) => (
  <li>
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 font-semibold shadow-md'
            : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'
        }`
      }
    >
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      <span className="font-medium">{children}</span>
    </NavLink>
  </li>
);

export default AdminLayout;