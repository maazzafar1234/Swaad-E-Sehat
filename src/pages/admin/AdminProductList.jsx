import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiLoader } from 'react-icons/fi';
import ClientApiInstance from '../../api/axiosIntercepter';
import { toast } from 'react-toastify';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await ClientApiInstance.get('/api/admin/products');
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch products.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This is permanent.`)) {
      try {
        await ClientApiInstance.delete(`/api/admin/products/${id}`);
        toast.success(`"${name}" was deleted.`);
        fetchProducts();
      } catch (err) {
        toast.error("Failed to delete product.");
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <FiLoader className="w-12 h-12 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <div>
          <h2 className="text-3xl font-bold text-amber-900"> Manage Products</h2>
          <p className="text-sm text-amber-700 mt-1">Add, edit, or delete your sweet items</p>
        </div>
        <Link 
          to="/admin/products/new"
          className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
        >
          <FiPlus size={20} />
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="p-6">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No products found. Start by adding your first product!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left">
              <thead>
                <tr className="border-b-2 border-amber-200 bg-amber-50">
                  <th className="p-4 font-bold text-amber-900">Name</th>
                  <th className="p-4 font-bold text-amber-900">Price</th>
                  <th className="p-4 font-bold text-amber-900">Stock</th>
                  <th className="p-4 font-bold text-amber-900">Status</th>
                  <th className="p-4 font-bold text-amber-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-amber-50 transition-colors duration-150">
                    <td className="p-4 font-semibold text-slate-800">{product.name}</td>
                    <td className="p-4 text-slate-700 font-medium">₹{product.base_price}</td>
                    <td className="p-4 text-slate-700">
                      <span className={`font-semibold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                        product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <Link 
                        to={`/admin/products/edit/${product.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-150"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-150"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
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

export default AdminProductList;