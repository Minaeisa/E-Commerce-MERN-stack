import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import { useDarkMode } from '../../contexts/DarkModeContext';

function ShopPageLayout() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
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
        const fetchedProducts = response.data.products || [];
        allProducts = [...allProducts, ...fetchedProducts];

        const totalPages = response.data.pages || 1;
        if (page >= totalPages || fetchedProducts.length === 0) {
          hasMore = false;
        } else {
          page++;
        }
      }

      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setAlertMessage('⚠️ Error loading products');
      setTimeout(() => setAlertMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find((item) => item._id === product._id || item.id === product._id);

    if (exists) {
      setAlertMessage('⚠️ Product is already in the cart!');
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
      setAlertMessage('✅ Product added to cart!');
    }

    setTimeout(() => setAlertMessage(''), 2000);
  };

  const sortedProducts = [...products]
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  if (loading) {
    return (
      <div className={`max-w-7xl mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-900 text-white' : ''}`}>
        <div className="text-center text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        🛍️ Shop All Products
      </h1>

      {alertMessage && (
        <div className={`mb-4 text-center ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-yellow-100 border-yellow-400 text-yellow-700'} border px-4 py-2 rounded`}>
          {alertMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className={`w-full sm:w-1/2 px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className={`px-4 py-2 border rounded w-full sm:w-1/4 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {sortedProducts.length === 0 && !loading && (
        <div className={`text-center py-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <p className="text-lg">No products found.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product._id}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded shadow hover:shadow-lg transition p-4`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-contain mb-3"
            />
            <h2 className={`font-semibold mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {product.name}
            </h2>
            <p className={`text-sm mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-3">
              <p className={`text-lg font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                ${product.price}
              </p>
              {product.rating > 0 && (
                <p className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  ⭐ {product.rating} ({product.numReviews})
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to={`/Products/${product._id}`}
                className={`text-center ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-indigo-300' : 'bg-gray-100 hover:bg-gray-200 text-indigo-700'} px-3 py-2 rounded text-sm`}
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.countInStock === 0}
                className={`${product.countInStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-2 px-3 rounded text-sm`}
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

export default ShopPageLayout;
