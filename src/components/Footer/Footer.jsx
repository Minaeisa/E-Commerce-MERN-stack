
import { useDarkMode } from '../../contexts/DarkModeContext';

function Footer() {
  const { isDarkMode } = useDarkMode();
  
  return (
    <>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-[#1f2937]'} py-6 text-white px-4 transition-colors`}>
        <form className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-stretch items-center justify-center gap-4 sm:gap-0">
          <span className="text-base md:text-lg font-medium text-center sm:text-left mb-2 sm:mb-0 sm:mr-4">
            Subscribe to our newsletter
          </span>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 text-black placeholder:text-center sm:placeholder:text-left text-left rounded-t sm:rounded-l sm:rounded-tr-none border border-gray-300 w-full sm:w-64 text-sm md:text-base"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-b sm:rounded-r sm:rounded-bl-none hover:bg-indigo-700 w-full sm:w-auto text-sm md:text-base"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>

      <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-[#1f2937]'} text-white py-6 md:py-10 px-4 text-sm md:text-base transition-colors`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3">Shopwise</h3>
            <p className="text-gray-400 mb-4">
              Discover the best deals on all your favorite categories.
            </p>
            <div className="flex gap-3 text-gray-400 text-base">
              <i className="fab fa-facebook-f hover:text-indigo-500"></i>
              <i className="fab fa-twitter hover:text-indigo-500"></i>
              <i className="fab fa-google hover:text-indigo-500"></i>
              <i className="fab fa-youtube hover:text-indigo-500"></i>
              <i className="fab fa-instagram hover:text-indigo-500"></i>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3">Useful Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/pages/aboutus" className="hover:text-indigo-500">About Us</a></li>
              <li><a href="/pages/faq" className="hover:text-indigo-500">FAQ</a></li>
              <li><a href="/location" className="hover:text-indigo-500">Location</a></li>
              <li><a href="/ContactUs" className="hover:text-indigo-500">Contact</a></li>
              <li><a href="/pages/terms" className="hover:text-indigo-500">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/category/men's clothing" className="hover:text-indigo-500">Men's Clothing</a></li>
              <li><a href="/category/women's clothing" className="hover:text-indigo-500">Women's Clothing</a></li>
              <li><a href="/category/jewelery" className="hover:text-indigo-500">Jewelery</a></li>
              <li><a href="/category/electronics" className="hover:text-indigo-500">Electronics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3">My Account</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/account" className="hover:text-indigo-500">My Account</a></li>
              <li><a href="/discount" className="hover:text-indigo-500">Discount</a></li>
              <li><a href="/returns" className="hover:text-indigo-500">Returns</a></li>
              <li><a href="/orders-history" className="hover:text-indigo-500">Orders History</a></li>
              <li><a href="/order-tracking" className="hover:text-indigo-500">Order Tracking</a></li>
            </ul>
          </div>

          <div className="pl-2 sm:pl-0">
  <h4 className="font-semibold mb-3">Contact Info</h4>
  <ul className="space-y-4 text-gray-300 text-sm">
    <li className="flex items-start gap-2">
      <i className="fas fa-map-marker-alt text-indigo-500 mt-1"></i>
      <span>123 Street,London, UK</span>
    </li>
    <li className="flex items-start gap-2">
      <i className="fas fa-envelope text-indigo-500 mt-1"></i>
      <span>info@sitename.com</span>
    </li>
    <li className="flex items-start gap-2">
      <i className="fas fa-phone text-indigo-500 mt-1"></i>
      <span>+457 789 789 65</span>
    </li>
  </ul>
</div>

        </div>

        <div className="text-center mt-10 border-t border-gray-700 pt-4 text-gray-500 text-xs md:text-sm">
          © 2025 All Rights Reserved by Shopwise
        </div>
      </footer>
    </>
  );
}

export default Footer;
