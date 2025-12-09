import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI, usersAPI, ordersAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, isAdmin, user } = useAuth();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    brand: '',
    countInStock: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/pages/login');
      return;
    }
    fetchData();
  }, [isAuthenticated, isAdmin, navigate, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'products') {
        const response = await productsAPI.getProducts({ pageNumber: 1 });
        setProducts(response.data.products || []);
      } else if (activeTab === 'users') {
        const response = await usersAPI.getUsers();
        setUsers(response.data || []);
      } else if (activeTab === 'orders') {
        const response = await ordersAPI.getAllOrders();
        setOrders(response.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        countInStock: parseInt(productForm.countInStock),
      };

      if (editingProduct) {
        await productsAPI.updateProduct(editingProduct._id, productData);
        setSuccess('Product updated successfully!');
      } else {
        await productsAPI.createProduct(productData);
        setSuccess('Product created successfully!');
      }

      setProductForm({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        brand: '',
        countInStock: '',
      });
      setEditingProduct(null);
      setShowProductForm(false);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      brand: product.brand || '',
      countInStock: product.countInStock.toString(),
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await productsAPI.deleteProduct(id);
      setSuccess('Product deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await usersAPI.deleteUser(id);
      setSuccess('User deleted successfully!');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h2>
          <button
            onClick={() => navigate('/')}
            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
          >
            ← Back to Shop
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
            {success}
          </div>
        )}

        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => {
              setActiveTab('products');
              setShowProductForm(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2 font-medium ${
              activeTab === 'products'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : isDarkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : isDarkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'orders'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : isDarkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Orders
          </button>
        </div>

        {loading ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Loading...
          </div>
        ) : (
          <>
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Products Management
                  </h3>
                  <button
                    onClick={() => {
                      setShowProductForm(!showProductForm);
                      setEditingProduct(null);
                      setProductForm({
                        name: '',
                        description: '',
                        price: '',
                        image: '',
                        category: '',
                        brand: '',
                        countInStock: '',
                      });
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    {showProductForm ? 'Cancel' : '+ Add Product'}
                  </button>
                </div>

                {showProductForm && (
                  <form
                    onSubmit={handleProductSubmit}
                    className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}
                  >
                    <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className={`w-full border rounded px-3 py-2 ${
                            isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Price *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          className={`w-full border rounded px-3 py-2 ${
                            isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Category *
                        </label>
                        <select
                          required
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          className={`w-full border rounded px-3 py-2 ${
                            isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        >
                          <option value="">Select Category</option>
                          <option value="electronics">Electronics</option>
                          <option value="jewelery">Jewelery</option>
                          <option value="men's clothing">Men's Clothing</option>
                          <option value="women's clothing">Women's Clothing</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Stock *
                        </label>
                        <input
                          type="number"
                          required
                          value={productForm.countInStock}
                          onChange={(e) => setProductForm({ ...productForm, countInStock: e.target.value })}
                          className={`w-full border rounded px-3 py-2 ${
                            isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Image URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={productForm.image}
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          className={`w-full border rounded px-3 py-2 ${
                            isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Brand
                        </label>
                        <input
                          type="text"
                          value={productForm.brand}
                          onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                          className={`w-full border rounded px-3 py-2 ${
                            isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Description *
                        </label>
                        <textarea
                          required
                          rows="3"
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          className={`w-full border rounded px-3 py-2 ${
                            isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                    >
                      {editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                  </form>
                )}

                <div className={`rounded-lg shadow overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                        <tr>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Image
                          </th>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Name
                          </th>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Price
                          </th>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Stock
                          </th>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Category
                          </th>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr
                            key={product._id}
                            className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                          >
                            <td className="px-4 py-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-contain bg-white rounded"
                              />
                            </td>
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {product.name}
                            </td>
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              ${product.price?.toFixed(2)}
                            </td>
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {product.countInStock}
                            </td>
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {product.category}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product._id)}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Users Management
                </h3>
                <div className={`rounded-lg shadow overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                        <tr>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Name
                          </th>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Email
                          </th>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Role
                          </th>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Phone
                          </th>
                          <th className={`px-4 py-3 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr
                            key={u._id}
                            className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                          >
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {u.name}
                            </td>
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {u.email}
                            </td>
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              <span
                                className={`px-2 py-1 rounded text-sm ${
                                  u.role === 'admin'
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                }`}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {u.phone || 'N/A'}
                            </td>
                            <td className="px-4 py-3">
                              {u._id !== user?._id && (
                                <button
                                  onClick={() => handleDeleteUser(u._id)}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                >
                                  Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Orders Management
                </h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className={`rounded-lg shadow p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                          <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            User: {order.user?.name || order.user?.email || 'N/A'}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Date: {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className={`text-lg font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                            ${order.totalPrice?.toFixed(2)}
                          </div>
                          <div className="flex gap-2">
                            <span
                              className={`px-3 py-1 rounded text-sm ${
                                order.isPaid
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              }`}
                            >
                              {order.isPaid ? 'Paid' : 'Pending'}
                            </span>
                            <span
                              className={`px-3 py-1 rounded text-sm ${
                                order.isDelivered
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                              }`}
                            >
                              {order.isDelivered ? 'Delivered' : 'Processing'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Items: {order.orderItems?.length || 0} | Payment: {order.paymentMethod}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

