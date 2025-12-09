import { useEffect, useState } from 'react';
import './CartHoverDropdown.css';
import { Link } from 'react-router-dom';

function CartHoverDropdown() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const syncCart = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(updatedCart);
    };
    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += delta;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="hover-cart">
      <h3 className="hover-cart-header">Your Shopping Cart</h3>

      {cart.length === 0 ? (
        <p className="empty-cart-text">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="hover-cart-item">
              <img src={item.image} alt={item.title} />
              <div className="hover-cart-details">
                <p className="hover-title">{item.title}</p>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                </div>
              </div>

              <button
                className="btn btn-remove"
                onClick={() => handleRemoveItem(index)}
                title="Remove item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  width="20"
                  height="20"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 6v12m6-12v12M5 6l1 14h12l1-14" />
                </svg>
              </button>
            </div>
          ))}

          <div className="hover-cart-total">
            <strong>Total: </strong>${totalPrice.toFixed(2)}
          </div>

          <div className="hover-cart-actions">
            <Link to="/cart" className="btn btn-view">View Cart</Link>
            <Link to="/pages/Checkout" className="btn btn-checkout">Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartHoverDropdown;
