import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ordersAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/pages/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading orders...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My Orders
          </h2>
          <Link
            to="/"
            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
          >
            ← Back to Shop
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              You haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Placed on {formatDate(order.createdAt)}
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
                </div>

                <div className="p-4">
                  <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Order Items:
                  </h4>
                  <div className="space-y-2">
                    {order.orderItems?.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain bg-white rounded"
                        />
                        <div className="flex-1">
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Quantity: {item.qty} × ${item.price?.toFixed(2)}
                          </p>
                        </div>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          ${(item.qty * item.price)?.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="space-y-1">
                      <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span>Shipping Address:</span>
                        <span className="text-right">
                          {order.shippingAddress?.address}, {order.shippingAddress?.city},{' '}
                          {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                        </span>
                      </div>
                      <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span>Payment Method:</span>
                        <span className="capitalize">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;

