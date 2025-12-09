import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../../../services/api';
import { useDarkMode } from '../../../contexts/DarkModeContext';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let allProducts = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await productsAPI.getProducts({ pageNumber: page });
        const products = response.data.products || [];
        allProducts = [...allProducts, ...products];
        
        const totalPages = response.data.pages || 1;
        if (page >= totalPages || products.length === 0) {
          hasMore = false;
        } else {
          page++;
        }
      }

      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage('⚠️ Error loading products');
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item._id === product._id || item.id === product._id);

    if (existingItem) {
      setMessage('⚠️ Product already in cart!');
    } else {
      cart.push({ 
        _id: product._id,
        id: product._id,
        title: product.name,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1 
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      setMessage('✅ Product added to cart!');
    }

    setTimeout(() => setMessage(null), 2000);
  };

  if (loading) {
    return (
      <div className={`w-full px-4 sm:px-8 py-10 max-w-7xl mx-auto ${isDarkMode ? 'text-white' : ''}`}>
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      {message && (
        <div className={`fixed top-6 right-6 ${isDarkMode ? 'bg-gray-800' : 'bg-black'} text-white px-4 py-2 rounded shadow-lg z-[9999] transition-opacity duration-300`}>
          {message}
        </div>
      )}
      {products.length === 0 && !loading && (
        <div className={`w-full px-4 sm:px-8 py-10 max-w-7xl mx-auto text-center ${isDarkMode ? 'text-white' : ''}`}>
          <p className="text-lg">No products found. Please check if products are loaded in the database.</p>
        </div>
      )}
      <div className="w-full px-4 sm:px-8 py-10 max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className={`text-lg font-semibold mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {product.name}
            </h2>
            <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-2">
              <div className={`font-bold text-lg ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                ${product.price}
              </div>
              {product.rating > 0 && (
                <div className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>
                  ⭐ {product.rating} ({product.numReviews})
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-auto">
  <Link
                to={`/Products/${product._id}`}
                className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-indigo-300' : 'bg-gray-100 hover:bg-gray-200 text-indigo-700'} px-3 py-1.5 rounded text-xs text-center w-full sm:w-auto`}
  >
    View Details
  </Link>
  <button
    onClick={() => handleAddToCart(product)}
                disabled={product.countInStock === 0}
                className={`${product.countInStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-1.5 px-3 rounded text-xs w-full sm:w-auto`}
  >
                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart 🛒'}
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
