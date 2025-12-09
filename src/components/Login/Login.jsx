import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { isDarkMode } = useDarkMode();
  const params = new URLSearchParams(location.search);
  const formType = params.get('form') || 'login';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setError('');
    setFormData({ name: '', email: '', password: '' });
    if (formType === 'login') {
      navigate('/pages/login?form=register');
    } else {
      navigate('/pages/login');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (formType === 'register') {
        result = await register(formData);
      } else {
        result = await login(formData.email, formData.password);
      }

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} flex items-center justify-center px-4 sm:px-6`}>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md`}>
        <h1 className={`text-center text-3xl font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-2`}>
          {formType === 'register' ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
          {formType === 'register'
            ? 'Join us by creating your account.'
            : 'Please enter your details to sign in.'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {formType === 'register' && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
                required
              />
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
              required
              minLength={6}
            />
          </div>

          {formType === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate('/pages/forgot-password')}
                className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : formType === 'register' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        <p className="text-sm text-center">
          {formType === 'register' ? (
            <>
              Already have an account?{' '}
              <button onClick={toggleForm} className="text-indigo-600 underline font-medium">
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button onClick={toggleForm} className="text-indigo-600 underline font-medium">
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
