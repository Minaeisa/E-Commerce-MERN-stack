import './NavBar.css';
import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaMoon, FaSun, FaSignOutAlt, FaHistory, FaCog } from 'react-icons/fa';
import CartHoverDropdown from '../Cart/CartHoverDropdown';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useAuth } from '../../contexts/AuthContext';

function NavBar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    };

    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { title: 'HOME', links: [{ path: '/home/fashion1', label: 'Fashion1' }] },
    {
      title: 'PAGES',
      links: [
        { path: '/pages/aboutus', label: 'About Us' },
        { path: '/pages/ContactUs', label: 'Contact Us' },
        { path: '/pages/faq', label: 'FAQ' },
        { path: '/pages/login', label: 'Login' },
        { path: '/pages/login?form=register', label: 'Register' },
        { path: '/pages/terms', label: 'Terms & Conditions' },
      ],
    },
    {
      title: 'PRODUCTS',
      links: [
        { path: '/category/electronics', label: 'Electronics' },
        { path: '/category/jewelery', label: 'Jewelery' },
        { path: "/category/men's clothing", label: "Men's Clothing" },
        { path: "/category/women's clothing", label: "Women's Clothing" },
      ],
    },
    { title: 'BLOG', links: [{ path: '/blog/grids', label: 'Grids' }] },
    { title: 'SHOP', links: [{ path: '/shop/layout', label: 'Shop Page Layout' }] },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <FaShoppingCart className="logo-icon" />
          <span className="logo-text">Shopwise</span>
        </div>

        <div className="hamburger" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <FaBars />
        </div>

        <div className="nav-links">
          {menuItems.map((item, index) => (
            <div key={index} className="dropdown">
              <span className="dropbtn">{item.title} ▾</span>
              <div className="dropdown-content">
                {item.links.map((link, i) => (
                  <Link to={link.path} key={i}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link className="nav-item" to="/contactus">
            CONTACT US
          </Link>
        </div>

        <div className="right-icons">
          <button 
            onClick={toggleDarkMode}
            className="dark-mode-toggle"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
          </button>
          <FaSearch className="icon" />

          {isDesktop ? (
            <div
              className="cart-dropdown-wrapper"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Link to="/cart" className="cart-icon relative">
                <FaShoppingCart className="icon" />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
              {isCartOpen && (
                <div className="cart-dropdown">
                  <CartHoverDropdown />
                </div>
              )}
            </div>
          ) : (
            <Link to="/cart" className="cart-icon relative">
              <FaShoppingCart className="icon" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          )}

          {user ? (
            <div className="user-menu">
              <div className="login-link dropdown">
                <span className="dropbtn">
                  <FaUser className="icon" /> <span className="login-text">{user.name?.toUpperCase() || 'USER'}</span> ▾
                </span>
                <div className="dropdown-content" style={{ right: 0, left: 'auto' }}>
                  <Link to="/orders-history">
                    <FaHistory className="icon" style={{ marginRight: '8px' }} />
                    Order History
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard">
                      <FaCog className="icon" style={{ marginRight: '8px' }} />
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              </div>
              <button 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="logout-btn"
                title="Logout"
                aria-label="Logout"
              >
                <FaSignOutAlt className="icon" />
              </button>
            </div>
          ) : (
          <Link to="/pages/login" className="login-link">
            <FaUser className="icon" /> <span className="login-text">LOGIN</span>
          </Link>
          )}
        </div>

        {isMobileOpen && (
          <div className="mobile-menu">
            {menuItems.map((item, index) => (
              <div key={index} className="mobile-dropdown-group">
                <strong className="text-white text-sm">{item.title}</strong>
                {item.links.map((link, i) => (
                  <Link to={link.path} key={i} onClick={() => setIsMobileOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <hr className="mobile-divider" />
              </div>
            ))}

            <Link to="/contactus" className="nav-item" onClick={() => setIsMobileOpen(false)}>
              CONTACT US
            </Link>
            {user && (
              <>
                <Link to="/orders-history" className="nav-item" onClick={() => setIsMobileOpen(false)}>
                  ORDER HISTORY
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="nav-item" onClick={() => setIsMobileOpen(false)}>
                    ADMIN DASHBOARD
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMobileOpen(false);
                  }}
                  className="nav-item text-left"
                >
                  LOGOUT
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
