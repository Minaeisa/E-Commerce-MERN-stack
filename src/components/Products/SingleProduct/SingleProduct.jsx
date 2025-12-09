import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productsAPI } from '../../../services/api';
import { useDarkMode } from '../../../contexts/DarkModeContext';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find((item) => item._id === product._id || item.id === product._id);
    if (exists) {
      setAdded('exists');
    } else {
      const updated = [...cart, { 
        _id: product._id,
        id: product._id,
        title: product.name,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: quantity 
      }];
      localStorage.setItem('cart', JSON.stringify(updated));
      setAdded('added');
      window.dispatchEvent(new Event('storage'));
    }
    setTimeout(() => setAdded(null), 2000);
  };

  if (loading) {
    return (
      <div className={`max-w-5xl mx-auto p-6 text-center ${isDarkMode ? 'text-white' : ''}`}>
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`max-w-5xl mx-auto p-6 text-center ${isDarkMode ? 'text-white' : ''}`}>
        Product not found
      </div>
    );
  }

  return (
    <div className={`max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6 relative ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {added === 'added' && (
        <div className={`absolute top-4 right-4 ${isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700'} px-4 py-2 rounded shadow z-10`}>
          ✅ Product added to cart
        </div>
      )}
      {added === 'exists' && (
        <div className={`absolute top-4 right-4 ${isDarkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-700'} px-4 py-2 rounded shadow z-10`}>
          ⚠️ Product is already in cart
        </div>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 h-96 object-contain bg-white rounded"
      />
      <div className="flex-1">
        <h1 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {product.name}
        </h1>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {product.description}
        </p>

        {product.rating > 0 && (
          <div className={`mb-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Rating: ⭐ {product.rating} / 5 ({product.numReviews} reviews)
          </div>
        )}

        <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Category: {product.category}
        </div>
        {product.brand && (
          <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Brand: {product.brand}
          </div>
        )}
        <div className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
          ${product.price}
        </div>

        {product.countInStock > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Quantity:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'} rounded`}
                >
                  -
                </button>
                <span className={`w-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                  className={`px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'} rounded`}
                >
                  +
                </button>
              </div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ({product.countInStock} in stock)
              </span>
            </div>
        <button
          onClick={handleAddToCart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
        >
          Add to Cart 🛒
        </button>
          </div>
        ) : (
          <div className="text-red-500 font-semibold">Out of Stock</div>
        )}

        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-8">
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Reviews
            </h3>
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className={`p-4 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {review.name}
                    </span>
                    <span className="text-yellow-500">⭐ {review.rating}</span>
                  </div>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleProduct;
