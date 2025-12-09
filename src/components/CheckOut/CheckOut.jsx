import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useAuth();
  const { isDarkMode } = useDarkMode();
  const [form, setForm] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    state: '',
    paymentMethod: 'stripe',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    
    if (user) {
      setForm(prev => ({
        ...prev,
        address: user.address?.street || '',
        city: user.address?.city || '',
        postalCode: user.address?.zipCode || '',
        country: user.address?.country || '',
        state: user.address?.state || '',
      }));
    }
  }, [user]);

  const itemsPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxPrice = (itemsPrice * 0.1).toFixed(2);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = (parseFloat(itemsPrice) + parseFloat(taxPrice) + shippingPrice).toFixed(2);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    if (!isAuthenticated) {
      setError('Please login to place an order');
      navigate('/pages/login');
      return;
    }

    try {
      setLoading(true);
      
      const orderItems = cart.map(item => ({
        name: item.title || item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item._id || item.id,
      }));

      const orderData = {
        orderItems,
        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
          state: form.state,
        },
        paymentMethod: form.paymentMethod,
        itemsPrice: itemsPrice.toFixed(2),
        taxPrice,
        shippingPrice: shippingPrice.toFixed(2),
        totalPrice,
      };

      await ordersAPI.createOrder(orderData);
      
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/');
      alert('Order placed successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className={`p-8 text-center ${isDarkMode ? 'bg-gray-900 min-h-screen' : ''}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Your cart is empty.
        </h2>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Please add some products before checking out.
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded shadow mt-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Checkout
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
          {error}
        </div>
      )}

      <section className="mb-8">
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Order Summary
        </h3>
        <ul className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {cart.map((item, i) => (
            <li key={i} className="flex items-center gap-4 py-4">
              <img
                src={item.image}
                alt={item.title || item.name}
                className="w-16 h-16 object-cover rounded bg-white"
              />
              <div className="flex-1">
                <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title || item.name}
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-2 mt-4">
          <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>Items:</span>
            <span>${itemsPrice.toFixed(2)}</span>
          </div>
          <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>Tax:</span>
            <span>${taxPrice}</span>
          </div>
          <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>Shipping:</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className={`text-right mt-2 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Total: ${totalPrice}
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={`block mb-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`} htmlFor="address">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={form.address}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className={`block mb-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`} htmlFor="city">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={form.city}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          <div className="flex-1">
            <label className={`block mb-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`} htmlFor="postalCode">
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              required
              value={form.postalCode}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className={`block mb-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`} htmlFor="state">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              value={form.state}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          <div className="flex-1">
            <label className={`block mb-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`} htmlFor="country">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              required
              value={form.country}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>
        </div>

        <div>
          <label className={`block mb-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`} htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
