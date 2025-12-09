import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsAPI } from '../../services/api';
import { useDarkMode } from '../../contexts/DarkModeContext';

function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedMsg, setAddedMsg] = useState(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts({ category: categoryName });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item._id === product._id || item.id === product._id);

    if (existing) {
      setAddedMsg('⚠️ Product already in cart');
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
      setAddedMsg('✅ Product added to cart');
    }

    setTimeout(() => setAddedMsg(null), 2000);
  };

  if (loading) {
    return (
      <div className={`p-4 sm:p-6 text-center ${isDarkMode ? 'text-white' : ''}`}>
        Loading products...
      </div>
    );
  }

  return (
    <div className={`p-4 sm:p-6 relative ${isDarkMode ? 'bg-gray-900 min-h-screen' : ''}`}>
      {addedMsg && (
        <div className={`fixed top-4 right-4 ${isDarkMode ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-100 text-indigo-800'} px-4 py-2 rounded shadow z-50 text-sm sm:text-base`}>
          {addedMsg}
        </div>
      )}

      <h2 className={`text-xl sm:text-2xl font-bold mb-6 capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {categoryName}
      </h2>

      {products.length === 0 ? (
        <div className={`text-center py-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No products found in this category
        </div>
      ) : (
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
              key={product._id}
              className={`border p-3 sm:p-4 rounded shadow hover:shadow-lg transition flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
          >
            <img
              src={product.image}
                alt={product.name}
                className="w-full h-40 sm:h-44 object-contain mb-3 bg-white rounded"
            />
              <h3 className={`font-semibold text-sm mb-1 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h3>
              <div className="flex items-center justify-between mb-3">
                <p className={`font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  ${product.price}
                </p>
                {product.rating > 0 && (
                  <span className={`text-xs ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    ⭐ {product.rating}
                  </span>
                )}
              </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-2">
              <Link
                  to={`/Products/${product._id}`}
                  className={`w-full sm:w-1/2 text-center py-2 text-sm rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                View
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                  disabled={product.countInStock === 0}
                  className={`w-full sm:w-1/2 py-2 text-sm rounded ${
                    product.countInStock === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white`}
              >
                  {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default CategoryProducts;
