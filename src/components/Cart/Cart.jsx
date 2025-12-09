import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';

function Cart() {
  const [cart, setCart] = useState([]);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(updatedCart);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += delta;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    updateLocalStorage(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateLocalStorage(updatedCart);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className={`max-w-3xl mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-900 min-h-screen' : ''}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Shopping Cart
      </h2>
      {cart.length === 0 ? (
        <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item, index) => (
              <div
                className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                key={index}
              >
                <img
                  src={item.image}
                  alt={item.title || item.name}
                  className="w-20 h-20 object-contain bg-white rounded"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title || item.name}
                  </h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    ${item.price}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                    >
                      -
                    </button>
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className={`mt-6 text-center font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Total: ${getTotal()}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <Link
              to="/"
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-indigo-600 transition"
            >
              ← Continue Shopping
            </Link>
            <Link
              to="/pages/Checkout"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Checkout →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
